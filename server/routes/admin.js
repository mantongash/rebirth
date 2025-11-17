const express = require('express');
const User = require('../models/User');
const Donation = require('../models/Donation');
const Product = require('../models/Product');
const Order = require('../models/Order');
const emailService = require('../services/emailService');
const smsService = require('../services/smsService');
const Application = require('../models/Application');
const Contact = require('../models/Contact');
const Content = require('../models/Content');
const router = express.Router();
const { authenticateAdmin, authenticateSuperAdmin } = require('../middleware/auth');

// Note: We rely on authenticateAdmin middleware from ../middleware/auth

// SECURE: Create new admin user (requires super admin authentication)
// @route   POST /api/admin/create-admin
// @desc    Create a new admin user (SECURE - requires super admin)
// @access  Private (Super Admin only)
router.post('/create-admin', authenticateSuperAdmin, async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !password) {
      return res.status(400).json({
        success: false,
        message: 'All required fields must be provided'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ email }, { phone }] 
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email or phone number already exists'
      });
    }

    // Create new admin user
    const newAdminUser = new User({
      firstName,
      lastName,
      email,
      phone,
      password,
      role: 'admin',
      isActive: true,
      emailVerified: true
    });

    await newAdminUser.save();

    // Log admin creation for security audit
    console.log(`[ADMIN CREATION] Super Admin ${req.user.email} created new admin account: ${email}`);

    res.json({
      success: true,
      message: 'Admin account created successfully',
      data: {
        user: newAdminUser.toJSON()
      }
    });
    
  } catch (error) {
    console.error('Error creating admin user:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating admin user',
      error: error.message
    });
  }
});

// SECURE: Update user role to admin (requires super admin authentication)
// @route   PUT /api/admin/users/:id/promote-to-admin
// @desc    Promote a user to admin role (SECURE - requires super admin)
// @access  Private (Super Admin only)
router.put('/users/:id/promote-to-admin', authenticateSuperAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    if (user.role === 'admin' || user.role === 'super_admin') {
      return res.status(400).json({
        success: false,
        message: 'User is already an admin or super admin'
      });
    }

    // Get the role from request body, default to 'admin'
    const { role = 'admin' } = req.body;
    
    // Only allow promoting to 'admin', not 'super_admin' (super_admin must be created manually)
    if (role !== 'admin') {
      return res.status(400).json({
        success: false,
        message: 'Can only promote users to admin role. Super admin must be created separately.'
      });
    }

    // Update role to admin
    user.role = role;
    user.isActive = true;
    user.emailVerified = true;
    await user.save();

    // Log role promotion for security audit
    console.log(`[ADMIN PROMOTION] Super Admin ${req.user.email} promoted user ${user.email} to ${role}`);

    res.json({
      success: true,
      message: 'User promoted to admin successfully',
      data: {
        user: user.toJSON()
      }
    });
    
  } catch (error) {
    console.error('Error promoting user to admin:', error);
    res.status(500).json({
      success: false,
      message: 'Error promoting user to admin',
      error: error.message
    });
  }
});

// @route   GET /api/admin/admins
// @desc    Get all admins (super admin only)
// @access  Private (Super Admin only)
router.get('/admins', authenticateSuperAdmin, async (req, res) => {
  try {
    const admins = await User.find({ 
      role: { $in: ['admin', 'super_admin'] } 
    })
    .select('-password')
    .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: {
        admins,
        total: admins.length,
        superAdmins: admins.filter(a => a.role === 'super_admin').length,
        regularAdmins: admins.filter(a => a.role === 'admin').length
      }
    });
  } catch (error) {
    console.error('Get admins error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch admins',
      error: error.message
    });
  }
});

// @route   PUT /api/admin/admins/:id
// @desc    Update admin details (super admin only)
// @access  Private (Super Admin only)
router.put('/admins/:id', authenticateSuperAdmin, async (req, res) => {
  try {
    const { firstName, lastName, email, phone, isActive } = req.body;
    const adminId = req.params.id;

    const admin = await User.findById(adminId);
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
    }

    // Cannot modify super_admin (except the current user modifying themselves)
    if (admin.role === 'super_admin' && admin._id.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: 'Cannot modify other super admins'
      });
    }

    // Update allowed fields
    if (firstName) admin.firstName = firstName;
    if (lastName) admin.lastName = lastName;
    if (email) admin.email = email;
    if (phone) admin.phone = phone;
    if (isActive !== undefined) admin.isActive = isActive;

    await admin.save();

    console.log(`[ADMIN UPDATE] Super Admin ${req.user.email} updated admin ${admin.email}`);

    res.json({
      success: true,
      message: 'Admin updated successfully',
      data: {
        admin: admin.toJSON()
      }
    });
  } catch (error) {
    console.error('Update admin error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update admin',
      error: error.message
    });
  }
});

// @route   DELETE /api/admin/admins/:id
// @desc    Remove admin (demote to user) - super admin only
// @access  Private (Super Admin only)
router.delete('/admins/:id', authenticateSuperAdmin, async (req, res) => {
  try {
    const adminId = req.params.id;

    // Cannot remove yourself
    if (adminId === req.user.userId) {
      return res.status(400).json({
        success: false,
        message: 'Cannot remove your own admin access'
      });
    }

    const admin = await User.findById(adminId);
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
    }

    // Cannot remove super_admin
    if (admin.role === 'super_admin') {
      return res.status(403).json({
        success: false,
        message: 'Cannot remove super admin. Super admins must be demoted manually in the database.'
      });
    }

    // Demote to regular user
    const previousRole = admin.role;
    admin.role = 'user';
    await admin.save();

    console.log(`[ADMIN REMOVAL] Super Admin ${req.user.email} removed admin ${admin.email} (demoted to user)`);

    res.json({
      success: true,
      message: 'Admin removed successfully (demoted to user)',
      data: {
        user: admin.toJSON()
      }
    });
  } catch (error) {
    console.error('Remove admin error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to remove admin',
      error: error.message
    });
  }
});

// Get admin user info
router.get('/admin-info', async (req, res) => {
  try {
    const adminUser = await User.findOne({ email: 'admin@rebirthofaqueen.org' });
    
    if (adminUser) {
      res.json({
        success: true,
        admin: {
          name: `${adminUser.firstName} ${adminUser.lastName}`,
          email: adminUser.email,
          role: adminUser.role,
          isActive: adminUser.isActive,
          isEmailVerified: adminUser.isEmailVerified
        }
      });
    } else {
      res.json({
        success: false,
        message: 'Admin user not found'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching admin info',
      error: error.message
    });
  }
});

// Test route to verify gallery creation (temporary)
router.post('/gallery/test', async (req, res) => {
  try {
    console.log('🧪 Testing gallery creation...');
    console.log('📝 Request body:', req.body);
    
    const testData = {
      title: 'Test Gallery Event',
      year: 2024,
      description: 'This is a test gallery event',
      images: [],
      status: 'published',
      isFeatured: false,
      eventFrequency: 'one-time',
      eventType: 'other'
    };
    
    const content = new Content({
      title: testData.title,
      content: testData.description,
      type: 'gallery',
      category: 'events',
      images: testData.images,
      status: testData.status,
      isFeatured: testData.isFeatured,
      isPublic: true,
      customFields: { year: testData.year },
      eventFrequency: testData.eventFrequency,
      eventType: testData.eventType
    });
    
    await content.save();
    console.log('✅ Test gallery created successfully:', content._id);
    
    res.json({ 
      success: true, 
      message: 'Test gallery created successfully',
      data: content 
    });
  } catch (error) {
    console.error('❌ Test gallery creation failed:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Test gallery creation failed', 
      error: error.message 
    });
  }
});

// Protect all routes below this line with admin authentication
router.use(authenticateAdmin);

// =========================
// Gallery (Events) Endpoints
// =========================

// Create a gallery event or add images to an event
// Payload: { title, year, description, images:[{url, cloudinaryId, alt, caption}] , status }
router.post('/gallery', async (req, res) => {
  try {
    console.log('🔍 Gallery creation request received');
    console.log('📝 Request body:', JSON.stringify(req.body, null, 2));
    console.log('👤 User:', req.user);
    
    const { 
      title, 
      year, 
      description, 
      images = [], 
      status = 'published', 
      isFeatured = false,
      eventFrequency = 'one-time',
      eventDate,
      eventLocation,
      eventType = 'other'
    } = req.body || {};

    console.log('📋 Parsed data:', {
      title,
      year,
      description,
      images: images.length,
      status,
      isFeatured,
      eventFrequency,
      eventDate,
      eventLocation,
      eventType
    });

    if (!title || !year) {
      console.log('❌ Missing required fields:', { title: !!title, year: !!year });
      return res.status(400).json({ success: false, message: 'Title and year are required' });
    }

    console.log('✅ Creating Content document...');
    const content = new Content({
      title,
      content: description || `${title} - ${year}`,
      type: 'gallery',
      category: 'events',
      images,
      status,
      isFeatured,
      isPublic: true,
      author: req.user && req.user._id ? req.user._id : undefined,
      customFields: { year: parseInt(year) }, // Ensure year is a number
      eventFrequency,
      eventDate: eventDate ? new Date(eventDate) : undefined,
      eventLocation,
      eventType
    });

    console.log('💾 Saving Content to database...');
    await content.save();
    console.log('✅ Gallery item created successfully:', content._id);
    
    res.json({ success: true, data: content });
  } catch (error) {
    console.error('❌ Error creating gallery item:', error);
    console.error('❌ Error stack:', error.stack);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to create gallery item', 
      error: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// List gallery items (admin view)
router.get('/gallery', async (req, res) => {
  try {
    const { fromYear, toYear, status } = req.query;
    const query = { type: 'gallery' };
    if (status) query.status = status;
    if (fromYear || toYear) {
      const from = parseInt(fromYear || '0', 10);
      const to = parseInt(toYear || '9999', 10);
      query['customFields.year'] = { $gte: from, $lte: to };
    }

    const items = await Content.find(query).sort({ 'customFields.year': -1, createdAt: -1 });
    res.json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch gallery items', error: error.message });
  }
});

// Update a gallery item
router.put('/gallery/:id', async (req, res) => {
  try {
    const { 
      title, 
      year, 
      description, 
      images = [], 
      status = 'published', 
      isFeatured = false,
      eventFrequency = 'one-time',
      eventDate,
      eventLocation,
      eventType = 'other'
    } = req.body;

    if (!title || !year) {
      return res.status(400).json({ success: false, message: 'Title and year are required' });
    }

    const content = await Content.findById(req.params.id);
    if (!content) {
      return res.status(404).json({ success: false, message: 'Gallery item not found' });
    }

    // Update fields
    content.title = title;
    content.content = description || `${title} - ${year}`;
    content.status = status;
    content.isFeatured = isFeatured;
    content.customFields = { year };
    content.eventFrequency = eventFrequency;
    content.eventDate = eventDate ? new Date(eventDate) : undefined;
    content.eventLocation = eventLocation;
    content.eventType = eventType;
    content.images = images;
    content.lastModifiedBy = req.user._id;

    await content.save();
    res.json({ success: true, data: content });
  } catch (error) {
    console.error('Error updating gallery item:', error);
    res.status(500).json({ success: false, message: 'Failed to update gallery item', error: error.message });
  }
});

// Delete a gallery item
router.delete('/gallery/:id', async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    if (!content) {
      return res.status(404).json({ success: false, message: 'Gallery item not found' });
    }

    // TODO: Delete images from Cloudinary if needed
    await Content.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Gallery item deleted successfully' });
  } catch (error) {
    console.error('Error deleting gallery item:', error);
    res.status(500).json({ success: false, message: 'Failed to delete gallery item', error: error.message });
  }
});

// Get single gallery item
router.get('/gallery/:id', async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    if (!content) {
      return res.status(404).json({ success: false, message: 'Gallery item not found' });
    }
    res.json({ success: true, data: content });
  } catch (error) {
    console.error('Error fetching gallery item:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch gallery item', error: error.message });
  }
});

// Gallery statistics endpoint
router.get('/gallery/stats', async (req, res) => {
  try {
    const stats = await Content.aggregate([
      { $match: { type: 'gallery' } },
      {
        $group: {
          _id: null,
          totalEvents: { $sum: 1 },
          totalImages: { $sum: { $size: { $ifNull: ['$images', []] } } },
          publishedEvents: {
            $sum: { $cond: [{ $eq: ['$status', 'published'] }, 1, 0] }
          },
          featuredEvents: {
            $sum: { $cond: [{ $eq: ['$isFeatured', true] }, 1, 0] }
          },
          annualEvents: {
            $sum: { $cond: [{ $eq: ['$eventFrequency', 'annual'] }, 1, 0] }
          },
          monthlyEvents: {
            $sum: { $cond: [{ $eq: ['$eventFrequency', 'monthly'] }, 1, 0] }
          },
          weeklyEvents: {
            $sum: { $cond: [{ $eq: ['$eventFrequency', 'weekly'] }, 1, 0] }
          }
        }
      }
    ]);

    res.json({ 
      success: true, 
      data: stats[0] || {
        totalEvents: 0,
        totalImages: 0,
        publishedEvents: 0,
        featuredEvents: 0,
        annualEvents: 0,
        monthlyEvents: 0,
        weeklyEvents: 0
      }
    });
  } catch (error) {
    console.error('Error fetching gallery stats:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch gallery statistics', error: error.message });
  }
});

// Update a gallery item (duplicate removed)
router.put('/gallery/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body || {};
    if (updates.year) {
      if (!updates.customFields) updates.customFields = {};
      updates.customFields.year = updates.year;
      delete updates.year;
    }
    const updated = await Content.findByIdAndUpdate(id, updates, { new: true });
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update gallery item', error: error.message });
  }
});

// Delete a gallery item
router.delete('/gallery/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Content.findByIdAndDelete(id);
    res.json({ success: true, message: 'Gallery item deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete gallery item', error: error.message });
  }
});

// Get dashboard data
router.get('/dashboard', async (req, res) => {
  try {
    // Get basic stats
    const [
      totalUsers,
      totalDonations,
      totalProducts,
      totalOrders,
      recentUsers,
      recentDonations,
      donationStats
    ] = await Promise.all([
      User.countDocuments(),
      Donation.countDocuments(),
      Product.countDocuments(),
      Order.countDocuments(),
      User.find().sort({ createdAt: -1 }).limit(5).select('firstName lastName email createdAt isActive isEmailVerified'),
      Donation.find().sort({ createdAt: -1 }).limit(5).select('firstName lastName amount paymentStatus createdAt'),
      Donation.aggregate([
        {
          $group: {
            _id: null,
            totalAmount: { $sum: '$amount' },
            completedDonations: {
              $sum: { $cond: [{ $eq: ['$paymentStatus', 'completed'] }, 1, 0] }
            },
            pendingDonations: {
              $sum: { $cond: [{ $eq: ['$paymentStatus', 'pending'] }, 1, 0] }
            }
          }
        }
      ])
    ]);

    // Get user stats
    const userStats = await User.aggregate([
      {
        $group: {
          _id: null,
          activeUsers: {
            $sum: { $cond: [{ $eq: ['$isActive', true] }, 1, 0] }
          },
          verifiedUsers: {
            $sum: { $cond: [{ $eq: ['$isEmailVerified', true] }, 1, 0] }
          }
        }
      }
    ]);

    // Get monthly data for charts (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlyUsers = await User.aggregate([
      {
        $match: { createdAt: { $gte: sixMonthsAgo } }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 }
      }
    ]);

    const monthlyDonations = await Donation.aggregate([
      {
        $match: { createdAt: { $gte: sixMonthsAgo } }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 },
          amount: { $sum: '$amount' }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 }
      }
    ]);

    const dashboardData = {
      totalUsers,
      totalDonations,
      totalProducts,
      totalOrders,
      recentUsers,
      recentDonations,
      donationStats: donationStats[0] || { totalAmount: 0, completedDonations: 0, pendingDonations: 0 },
      userStats: userStats[0] || { activeUsers: 0, verifiedUsers: 0 },
      monthlyUsers,
      monthlyDonations
    };

    res.json(dashboardData);

  } catch (error) {
    console.error('Get dashboard data error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get sidebar data with real-time counts and badges
router.get('/sidebar-data', async (req, res) => {
  try {
    // Get real-time counts for sidebar badges
    const [
      totalUsers,
      pendingDonations,
      totalDonations,
      newUsersToday,
      newDonationsToday,
      pendingApplications,
      totalProducts,
      totalOrders,
      unreadNotifications
    ] = await Promise.all([
      User.countDocuments(),
      Donation.countDocuments({ paymentStatus: 'pending' }),
      Donation.countDocuments(),
      User.countDocuments({ 
        createdAt: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) } 
      }),
      Donation.countDocuments({ 
        createdAt: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) } 
      }),
      // Placeholder for applications - replace with actual model when available
      Promise.resolve(0),
      // Get actual product count
      Product.countDocuments(),
      // Get actual order count
      Order.countDocuments(),
      // Placeholder for notifications - replace with actual model when available
      Promise.resolve(0)
    ]);

    // Build sidebar menu structure with real data
    const sidebarData = {
      menuItems: [
        {
          title: 'Main',
          icon: 'FaRocket',
          items: [
            { 
              label: 'Dashboard', 
              icon: 'FaTachometerAlt', 
              to: '/admin', 
              badge: null 
            },
            { 
              label: 'Analytics', 
              icon: 'FaChartBar', 
              to: '/admin/analytics', 
              badge: newUsersToday > 0 ? `${newUsersToday} new` : null 
            },
            { 
              label: 'Reports', 
              icon: 'FaFileAlt', 
              to: '/admin/reports', 
              badge: null 
            }
          ]
        },
        {
          title: 'User Management',
          icon: 'FaUsers',
          items: [
            { 
              label: 'Users', 
              icon: 'FaUsers', 
              to: '/admin/users', 
              badge: totalUsers > 0 ? totalUsers.toString() : null 
            },
            { 
              label: 'Roles & Permissions', 
              icon: 'FaShieldAlt', 
              to: '/admin/roles', 
              badge: null 
            },
            { 
              label: 'User Profiles', 
              icon: 'FaUser', 
              to: '/admin/profiles', 
              badge: null 
            }
          ]
        },
        {
          title: 'Content & Programs',
          icon: 'FaGraduationCap',
          items: [
            { 
              label: 'Programs', 
              icon: 'FaGraduationCap', 
              to: '/admin/programs', 
              badge: null 
            },
            { 
              label: 'Applications', 
              icon: 'FaFileAlt', 
              to: '/admin/applications', 
              badge: pendingApplications > 0 ? pendingApplications.toString() : null 
            },
            { 
              label: 'Content Management', 
              icon: 'FaEdit', 
              to: '/admin/content', 
              badge: null 
            }
          ]
        },
        {
          title: 'E-commerce',
          icon: 'FaShoppingCart',
          items: [
            { 
              label: 'Products', 
              icon: 'FaBox', 
              to: '/admin/products', 
              badge: totalProducts > 0 ? totalProducts.toString() : null 
            },
            { 
              label: 'Orders', 
              icon: 'FaShoppingCart', 
              to: '/admin/orders', 
              badge: totalOrders > 0 ? totalOrders.toString() : null 
            },
            { 
              label: 'Inventory', 
              icon: 'FaDatabase', 
              to: '/admin/inventory', 
              badge: null 
            }
          ]
        },
        {
          title: 'Financial',
          icon: 'FaDonate',
          items: [
            { 
              label: 'Donations', 
              icon: 'FaDonate', 
              to: '/admin/donations', 
              badge: totalDonations > 0 ? totalDonations.toString() : null 
            },
            { 
              label: 'Payments', 
              icon: 'FaCreditCard', 
              to: '/admin/payments', 
              badge: pendingDonations > 0 ? `${pendingDonations} pending` : null 
            },
            { 
              label: 'Financial Reports', 
              icon: 'FaChartBar', 
              to: '/admin/financials', 
              badge: null 
            }
          ]
        },
        {
          title: 'Communication',
          icon: 'FaBell',
          items: [
            { 
              label: 'Announcements', 
              icon: 'FaBell', 
              to: '/admin/announcements', 
              badge: null 
            },
            { 
              label: 'Bulk SMS', 
              icon: 'FaSms', 
              to: '/admin/bulk-sms', 
              badge: null 
            },
            { 
              label: 'Email Campaigns', 
              icon: 'FaEnvelope', 
              to: '/admin/emails', 
              badge: null 
            }
          ]
        },
        {
          title: 'System',
          icon: 'FaCog',
          items: [
            { 
              label: 'Settings', 
              icon: 'FaCog', 
              to: '/admin/settings', 
              badge: null 
            },
            { 
              label: 'Security', 
              icon: 'FaShieldAlt', 
              to: '/admin/security', 
              badge: null 
            },
            { 
              label: 'System Logs', 
              icon: 'FaHistory', 
              to: '/admin/logs', 
              badge: null 
            }
          ]
        }
      ],
      stats: {
        totalUsers,
        pendingDonations,
        totalDonations,
        newUsersToday,
        newDonationsToday,
        pendingApplications,
        totalProducts,
        totalOrders,
        unreadNotifications
      }
    };

    res.json(sidebarData);

  } catch (error) {
    console.error('Get sidebar data error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ==================== ADMIN: CONTENT & PROGRAMS ====================

// Admin - Contacts list with filters and stats
router.get('/contacts', authenticateAdmin, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const search = req.query.search || '';
    const status = req.query.status || '';

    const skip = (page - 1) * limit;

    // Build query from filters
    let query = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } }
      ];
    }
    if (status) query.status = status;

    const [contacts, total, statusCounts] = await Promise.all([
      Contact.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Contact.countDocuments(query),
      Contact.aggregate([
        { $match: query },
        { $group: { _id: '$status', count: { $sum: 1 } } }
      ])
    ]);

    const stats = {
      total,
      new: statusCounts.find(s => s._id === 'new')?.count || 0,
      read: statusCounts.find(s => s._id === 'read')?.count || 0,
      replied: statusCounts.find(s => s._id === 'replied')?.count || 0,
      closed: statusCounts.find(s => s._id === 'closed')?.count || 0
    };

    res.json({
      contacts,
      stats,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get contacts (admin) error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin - Update contact status
router.put('/contacts/:id/status', authenticateAdmin, async (req, res) => {
  try {
    const { status, reviewNotes } = req.body;
    const validStatuses = ['new', 'read', 'replied', 'closed'];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    if (status) contact.status = status;
    if (reviewNotes !== undefined) contact.reviewNotes = reviewNotes;
    contact.reviewedBy = req.user._id;
    contact.reviewedAt = new Date();
    await contact.save();

    res.json({ success: true, contact });
  } catch (error) {
    console.error('Update contact status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin - Get contact details
router.get('/contacts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const contact = await Contact.findById(id)
      .populate('reviewedBy', 'firstName lastName email');

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.json({
      success: true,
      contact
    });

  } catch (error) {
    console.error('Get contact details error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin - Applications list with filters and stats
router.get('/applications', authenticateAdmin, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const search = req.query.search || '';
    const status = req.query.status || '';
    const program = req.query.program || '';

    const skip = (page - 1) * limit;

    // Build query from filters
    let query = {};
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } }
      ];
    }
    if (status) query.status = status;
    if (program) query.program = program;

    const [applications, total, statusCounts] = await Promise.all([
      Application.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Application.countDocuments(query),
      Application.aggregate([
        { $match: query },
        { $group: { _id: '$status', count: { $sum: 1 } } }
      ])
    ]);

    const stats = {
      total,
      pending: statusCounts.find(s => s._id === 'pending')?.count || 0,
      approved: statusCounts.find(s => s._id === 'accepted')?.count || 0,
      rejected: statusCounts.find(s => s._id === 'rejected')?.count || 0
    };

    res.json({
      applications,
      stats,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get applications (admin) error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin - Send response to application (email and/or SMS)
router.post('/applications/:id/respond', authenticateAdmin, async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { emailResponse, smsResponse } = req.body;
    const adminId = req.user.id;

    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    const results = {
      emailSent: false,
      smsSent: false,
      errors: []
    };

    // Send email response if provided
    if (emailResponse && emailResponse.subject && emailResponse.message) {
      try {
        await emailService.sendAdminResponseEmail(application, emailResponse);
        
        // Update application with email response info
        application.adminResponse.emailResponse = {
          sent: true,
          sentAt: new Date(),
          subject: emailResponse.subject,
          message: emailResponse.message,
          sentBy: adminId
        };
        
        results.emailSent = true;
      } catch (error) {
        console.error('Error sending admin email response:', error);
        results.errors.push('Failed to send email response');
      }
    }

    // Send SMS response if provided
    if (smsResponse && smsResponse.message) {
      try {
        await smsService.sendAdminResponseSMS(application, smsResponse);
        
        // Update application with SMS response info
        application.adminResponse.smsResponse = {
          sent: true,
          sentAt: new Date(),
          message: smsResponse.message,
          sentBy: adminId
        };
        
        results.smsSent = true;
      } catch (error) {
        console.error('Error sending admin SMS response:', error);
        results.errors.push('Failed to send SMS response');
      }
    }

    await application.save();

    res.json({
      success: true,
      message: 'Response sent successfully',
      results
    });

  } catch (error) {
    console.error('Admin response error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin - Get application details with response history
router.get('/applications/:id', authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    
    const application = await Application.findById(id)
      .populate('reviewedBy', 'firstName lastName email')
      .populate('adminResponse.emailResponse.sentBy', 'firstName lastName email')
      .populate('adminResponse.smsResponse.sentBy', 'firstName lastName email');

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.json({
      success: true,
      application
    });

  } catch (error) {
    console.error('Get application details error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin - Update application status and review notes
router.put('/applications/:id/status', async (req, res) => {
  try {
    const { status, reviewNotes } = req.body;
    const validStatuses = ['pending', 'reviewed', 'accepted', 'rejected', 'waitlisted'];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    if (status) application.status = status;
    if (reviewNotes !== undefined) application.reviewNotes = reviewNotes;
    application.reviewedBy = req.user._id;
    application.reviewedAt = new Date();
    await application.save();

    res.json({ success: true, application });
  } catch (error) {
    console.error('Update application status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin - Programs list derived from applications with stats
router.get('/programs', async (req, res) => {
  try {
    const search = req.query.search || '';
    const statusFilter = req.query.status || '';

    // Known programs from Application model enum
    const knownPrograms = ['education', 'fashion', 'photography', 'leather', 'fitness', 'other'];

    // Aggregate stats by program and status
    const pipeline = [
      ...(search ? [{ $match: { $or: [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } }
      ] } }] : []),
      ...(statusFilter ? [{ $match: { status: statusFilter } }] : []),
      { $group: { _id: { program: '$program', status: '$status' }, count: { $sum: 1 } } }
    ];

    const grouped = await Application.aggregate(pipeline);

    // Build a map of program -> stats
    const byProgram = new Map();
    knownPrograms.forEach(p => byProgram.set(p, { total: 0, pending: 0, accepted: 0, rejected: 0, reviewed: 0, waitlisted: 0 }));
    grouped.forEach(g => {
      const program = g._id.program || 'other';
      const status = g._id.status || 'pending';
      const stats = byProgram.get(program) || { total: 0, pending: 0, accepted: 0, rejected: 0, reviewed: 0, waitlisted: 0 };
      stats.total += g.count;
      if (status === 'pending') stats.pending += g.count;
      if (status === 'accepted') stats.accepted += g.count;
      if (status === 'rejected') stats.rejected += g.count;
      if (status === 'reviewed') stats.reviewed += g.count;
      if (status === 'waitlisted') stats.waitlisted += g.count;
      byProgram.set(program, stats);
    });

    // Fetch a few recent applications for each program
    const recentByProgram = await Application.aggregate([
      ...(search ? [{ $match: { $or: [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } }
      ] } }] : []),
      ...(statusFilter ? [{ $match: { status: statusFilter } }] : []),
      { $sort: { createdAt: -1 } },
      { $group: { _id: '$program', items: { $push: { _id: '$_id', firstName: '$firstName', lastName: '$lastName', email: '$email', status: '$status', createdAt: '$createdAt' } } } },
      { $project: { items: { $slice: ['$items', 3] } } }
    ]);
    const recentMap = new Map(recentByProgram.map(r => [r._id, r.items]));

    // Build response array
    const programs = knownPrograms.map(p => ({
      id: p,
      title: p.charAt(0).toUpperCase() + p.slice(1),
      description: `Applications for the ${p} program`,
      status: byProgram.get(p)?.total > 0 ? 'active' : 'draft',
      stats: byProgram.get(p),
      recentApplications: recentMap.get(p) || []
    }));

    res.json({ programs });
  } catch (error) {
    console.error('Get programs (admin) error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ==================== ADMIN: CONTENT MANAGEMENT ====================

// Admin - Content list with filters and stats
router.get('/content', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const search = req.query.search || '';
    const type = req.query.type || '';
    const status = req.query.status || '';
    const category = req.query.category || '';

    const skip = (page - 1) * limit;

    // Build query from filters
    let query = {};
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }
    if (type) query.type = type;
    if (status) query.status = status;
    if (category) query.category = category;

    const [content, total, typeCounts, statusCounts] = await Promise.all([
      Content.find(query)
        .populate('author', 'firstName lastName email')
        .populate('lastModifiedBy', 'firstName lastName email')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Content.countDocuments(query),
      Content.aggregate([
        { $match: query },
        { $group: { _id: '$type', count: { $sum: 1 } } }
      ]),
      Content.aggregate([
        { $match: query },
        { $group: { _id: '$status', count: { $sum: 1 } } }
      ])
    ]);

    const stats = {
      total,
      published: statusCounts.find(s => s._id === 'published')?.count || 0,
      draft: statusCounts.find(s => s._id === 'draft')?.count || 0,
      archived: statusCounts.find(s => s._id === 'archived')?.count || 0,
      byType: typeCounts
    };

    res.json({
      content,
      stats,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get content (admin) error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin - Create content
router.post('/content', async (req, res) => {
  try {
    const {
      title,
      content: contentBody,
      excerpt,
      type,
      category,
      tags = [],
      featuredImage,
      images = [],
      status = 'draft',
      isFeatured = false,
      isPublic = true,
      seo = {},
      customFields = {}
    } = req.body;

    if (!title || !contentBody || !type) {
      return res.status(400).json({
        success: false,
        message: 'Title, content, and type are required'
      });
    }

    const content = new Content({
      title,
      content: contentBody,
      excerpt,
      type,
      category,
      tags,
      featuredImage,
      images,
      status,
      isFeatured,
      isPublic,
      seo,
      customFields,
      author: req.user._id
    });

    await content.save();
    await content.populate('author', 'firstName lastName email');

    res.status(201).json({
      success: true,
      message: 'Content created successfully',
      data: content
    });
  } catch (error) {
    console.error('Create content error:', error);
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'Content with this title already exists'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Failed to create content',
      error: error.message
    });
  }
});

// Admin - Update content
router.put('/content/:id', async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found'
      });
    }

    const updates = req.body;
    Object.keys(updates).forEach(key => {
      if (updates[key] !== undefined) {
        content[key] = updates[key];
      }
    });
    content.lastModifiedBy = req.user._id;

    await content.save();
    await content.populate('author', 'firstName lastName email');
    await content.populate('lastModifiedBy', 'firstName lastName email');

    res.json({
      success: true,
      message: 'Content updated successfully',
      data: content
    });
  } catch (error) {
    console.error('Update content error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update content',
      error: error.message
    });
  }
});

// Admin - Delete content
router.delete('/content/:id', async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found'
      });
    }

    await Content.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Content deleted successfully'
    });
  } catch (error) {
    console.error('Delete content error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete content',
      error: error.message
    });
  }
});

// ==================== ADMIN: INVENTORY MANAGEMENT ====================

// Admin - Inventory overview with real-time data
router.get('/inventory', async (req, res) => {
  try {
    const { category, status, lowStock = 10 } = req.query;

    // Build query
    let query = {};
    if (category) query.category = category;
    if (status) query.status = status;

    const [
      totalProducts,
      lowStockProducts,
      outOfStockProducts,
      categoryStats,
      recentProducts,
      inventoryValue
    ] = await Promise.all([
      Product.countDocuments(query),
      Product.countDocuments({ ...query, stock: { $gt: 0, $lte: parseInt(lowStock) } }),
      Product.countDocuments({ ...query, stock: 0 }),
      Product.aggregate([
        { $match: query },
        { $group: { _id: '$category', count: { $sum: 1 }, totalStock: { $sum: '$stock' } } }
      ]),
      Product.find(query)
        .sort({ createdAt: -1 })
        .limit(5)
        .select('name category stock price status createdAt'),
      Product.aggregate([
        { $match: query },
        { $group: { _id: null, totalValue: { $sum: { $multiply: ['$price', '$stock'] } } } }
      ])
    ]);

    const stats = {
      totalProducts,
      lowStockProducts,
      outOfStockProducts,
      inStockProducts: totalProducts - outOfStockProducts,
      totalInventoryValue: inventoryValue[0]?.totalValue || 0,
      categoryStats
    };

    res.json({
      stats,
      recentProducts,
      lowStockThreshold: parseInt(lowStock)
    });
  } catch (error) {
    console.error('Get inventory (admin) error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin - Update product stock
router.put('/inventory/:id/stock', async (req, res) => {
  try {
    const { stock, operation = 'set' } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    if (operation === 'add') {
      product.stock += parseInt(stock);
    } else if (operation === 'subtract') {
      product.stock = Math.max(0, product.stock - parseInt(stock));
    } else {
      product.stock = Math.max(0, parseInt(stock));
    }

    await product.save();

    res.json({
      success: true,
      message: 'Stock updated successfully',
      data: { stock: product.stock }
    });
  } catch (error) {
    console.error('Update stock error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update stock',
      error: error.message
    });
  }
});

// ==================== ADMIN: FINANCIAL REPORTS ====================

// Admin - Financial reports with real-time data
router.get('/financial-reports', async (req, res) => {
  try {
    const { period = '30', type = 'overview' } = req.query;
    const startDate = new Date(Date.now() - parseInt(period) * 24 * 60 * 60 * 1000);

    let report = {};

    switch (type) {
      case 'overview':
        const [donationStats, orderStats, monthlyTrends] = await Promise.all([
          Donation.aggregate([
            { $match: { createdAt: { $gte: startDate } } },
            {
              $group: {
                _id: null,
                totalDonations: { $sum: 1 },
                totalAmount: { $sum: '$amount' },
                completedAmount: { $sum: { $cond: [{ $eq: ['$paymentStatus', 'completed'] }, '$amount', 0] } },
                pendingAmount: { $sum: { $cond: [{ $eq: ['$paymentStatus', 'pending'] }, '$amount', 0] } },
                avgDonation: { $avg: '$amount' }
              }
            }
          ]),
          Order.aggregate([
            { $match: { createdAt: { $gte: startDate } } },
            {
              $group: {
                _id: null,
                totalOrders: { $sum: 1 },
                totalRevenue: { $sum: '$total' },
                completedRevenue: { $sum: { $cond: [{ $eq: ['$status', 'completed'] }, '$total', 0] } },
                avgOrderValue: { $avg: '$total' }
              }
            }
          ]),
          Donation.aggregate([
            { $match: { createdAt: { $gte: startDate } } },
            {
              $group: {
                _id: {
                  year: { $year: '$createdAt' },
                  month: { $month: '$createdAt' },
                  day: { $dayOfMonth: '$createdAt' }
                },
                count: { $sum: 1 },
                amount: { $sum: '$amount' }
              }
            },
            { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 } }
          ])
        ]);

        report = {
          period: `${period} days`,
          donations: donationStats[0] || {
            totalDonations: 0,
            totalAmount: 0,
            completedAmount: 0,
            pendingAmount: 0,
            avgDonation: 0
          },
          orders: orderStats[0] || {
            totalOrders: 0,
            totalRevenue: 0,
            completedRevenue: 0,
            avgOrderValue: 0
          },
          monthlyTrends,
          totalRevenue: (donationStats[0]?.completedAmount || 0) + (orderStats[0]?.completedRevenue || 0)
        };
        break;

      case 'donations':
        const donationBreakdown = await Donation.aggregate([
          { $match: { createdAt: { $gte: startDate } } },
          {
            $group: {
              _id: '$paymentMethod',
              count: { $sum: 1 },
              totalAmount: { $sum: '$amount' },
              avgAmount: { $avg: '$amount' }
            }
          }
        ]);

        report = { donationBreakdown };
        break;

      case 'orders':
        const orderBreakdown = await Order.aggregate([
          { $match: { createdAt: { $gte: startDate } } },
          {
            $group: {
              _id: '$paymentMethod',
              count: { $sum: 1 },
              totalRevenue: { $sum: '$total' },
              avgValue: { $avg: '$total' }
            }
          }
        ]);

        report = { orderBreakdown };
        break;

      default:
        return res.status(400).json({ message: 'Invalid report type' });
    }

    res.json({ report });
  } catch (error) {
    console.error('Get financial reports error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get analytics data
router.get('/analytics', async (req, res) => {
  try {
    const { timeRange = '30d' } = req.query;
    
    // Calculate date range
    const now = new Date();
    let startDate;
    switch (timeRange) {
      case '7d':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30d':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case '90d':
        startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    }

    // Get analytics data
    const [
      totalUsers,
      newUsers,
      totalDonations,
      newDonations,
      totalOrders,
      newOrders,
      totalRevenue,
      recentActivity
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ createdAt: { $gte: startDate } }),
      Donation.countDocuments(),
      Donation.countDocuments({ createdAt: { $gte: startDate } }),
      Order.countDocuments(),
      Order.countDocuments({ createdAt: { $gte: startDate } }),
      // Calculate total revenue from completed donations
      Donation.aggregate([
        { $match: { paymentStatus: 'completed' } },
        { $group: { _id: null, total: { $sum: '$amount' } } }
      ]),
      // Get recent activity
      Promise.all([
        User.find().sort({ createdAt: -1 }).limit(3).select('firstName lastName email createdAt'),
        Donation.find().sort({ createdAt: -1 }).limit(3).select('firstName lastName amount paymentStatus createdAt')
      ])
    ]);

    // Process recent activity
    const processedActivity = [];
    
    // Add recent users
    const recentUsers = await User.find().sort({ createdAt: -1 }).limit(3).select('firstName lastName email createdAt');
    recentUsers.forEach(user => {
      processedActivity.push({
        type: 'user',
        title: `New user registered: ${user.firstName} ${user.lastName}`,
        time: user.createdAt.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          hour: '2-digit', 
          minute: '2-digit' 
        })
      });
    });

    // Add recent donations
    const recentDonations = await Donation.find().sort({ createdAt: -1 }).limit(3).select('firstName lastName amount paymentStatus createdAt');
    recentDonations.forEach(donation => {
      processedActivity.push({
        type: 'donation',
        title: `New donation: ${donation.firstName} ${donation.lastName} - ${donation.amount} KES`,
        time: donation.createdAt.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          hour: '2-digit', 
          minute: '2-digit' 
        })
      });
    });

    // Sort by creation date
    processedActivity.sort((a, b) => new Date(b.time) - new Date(a.time));

    const analyticsData = {
      totalUsers,
      newUsers,
      totalDonations,
      newDonations,
      totalOrders,
      newOrders,
      totalRevenue: totalRevenue[0]?.total || 0,
      revenueGrowth: 15, // Placeholder - calculate actual growth
      recentActivity: processedActivity.slice(0, 5)
    };

    res.json(analyticsData);

  } catch (error) {
    console.error('Get analytics error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get reports data
router.get('/reports', async (req, res) => {
  try {
    const { type = 'overview', period = '30' } = req.query;
    const startDate = new Date(Date.now() - parseInt(period) * 24 * 60 * 60 * 1000);

    let report = {};

    switch (type) {
      case 'overview':
        // Get overview statistics
        const [userStats, donationStats] = await Promise.all([
          User.aggregate([
            {
              $match: { createdAt: { $gte: startDate } }
            },
            {
              $group: {
                _id: null,
                newUsers: { $sum: 1 },
                activeUsers: { $sum: { $cond: [{ $gt: ['$loginCount', 0] }, 1, 0] } },
                verifiedUsers: { $sum: { $cond: ['$isEmailVerified', 1, 0] } }
              }
            }
          ]),
          Donation.aggregate([
            {
              $match: { createdAt: { $gte: startDate } }
            },
            {
              $group: {
                _id: null,
                totalDonations: { $sum: 1 },
                totalAmount: { $sum: '$amount' },
                completedDonations: { $sum: { $cond: [{ $eq: ['$paymentStatus', 'completed'] }, 1, 0] } },
                completedAmount: { $sum: { $cond: [{ $eq: ['$paymentStatus', 'completed'] }, '$amount', 0] } }
              }
            }
          ])
        ]);

        report = {
          period: `${period} days`,
          users: userStats[0] || { newUsers: 0, activeUsers: 0, verifiedUsers: 0 },
          donations: donationStats[0] || { totalDonations: 0, totalAmount: 0, completedDonations: 0, completedAmount: 0 }
        };
        break;

      case 'user-growth':
        // Get user growth over time
        const userGrowth = await User.aggregate([
          {
            $match: { createdAt: { $gte: startDate } }
          },
          {
            $group: {
              _id: {
                year: { $year: '$createdAt' },
                month: { $month: '$createdAt' },
                day: { $dayOfMonth: '$createdAt' }
              },
              count: { $sum: 1 }
            }
          },
          {
            $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 }
          }
        ]);

        report = { userGrowth };
        break;

      case 'donation-trends':
        // Get donation trends over time
        const donationTrends = await Donation.aggregate([
          {
            $match: { createdAt: { $gte: startDate } }
          },
          {
            $group: {
              _id: {
                year: { $year: '$createdAt' },
                month: { $month: '$createdAt' },
                day: { $dayOfMonth: '$createdAt' }
              },
              count: { $sum: 1 },
              amount: { $sum: '$amount' }
            }
          },
          {
            $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 }
          }
        ]);

        report = { donationTrends };
        break;

      default:
        return res.status(400).json({ message: 'Invalid report type' });
    }

    res.json({ report });

  } catch (error) {
    console.error('Get reports error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all users with pagination
router.get('/users', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const search = req.query.search || '';
    const role = req.query.role || '';
    const status = req.query.status || '';

    const skip = (page - 1) * limit;

    // Build query
    let query = {};
    
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    if (role) {
      query.role = role;
    }

    if (status === 'active') {
      query.isActive = true;
    } else if (status === 'inactive') {
      query.isActive = false;
    }

    // Get users
    const users = await User.find(query)
      .select('-password -emailVerificationToken -emailVerificationExpires -passwordResetToken -passwordResetExpires')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Get total count
    const total = await User.countDocuments(query);

    res.json({
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all donations with pagination and filtering
router.get('/donations', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const search = req.query.search || '';
    const status = req.query.status || '';
    const paymentMethod = req.query.paymentMethod || '';
    const startDate = req.query.startDate || '';
    const endDate = req.query.endDate || '';

    const skip = (page - 1) * limit;

    // Build query
    let query = {};
    
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    if (status) {
      query.paymentStatus = status;
    }

    if (paymentMethod) {
      query.paymentMethod = paymentMethod;
    }

    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    // Get donations
    const donations = await Donation.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Get total count
    const total = await Donation.countDocuments(query);

    // Get summary statistics
    const summary = await Donation.aggregate([
      { $match: query },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: '$amount' },
          totalCount: { $sum: 1 },
          completedAmount: { $sum: { $cond: [{ $eq: ['$paymentStatus', 'completed'] }, '$amount', 0] } },
          completedCount: { $sum: { $cond: [{ $eq: ['$paymentStatus', 'completed'] }, 1, 0] } },
          pendingAmount: { $sum: { $cond: [{ $eq: ['$paymentStatus', 'pending'] }, '$amount', 0] } },
          pendingCount: { $sum: { $cond: [{ $eq: ['$paymentStatus', 'pending'] }, 1, 0] } }
        }
      }
    ]);

    res.json({
      donations,
      summary: summary[0] || {
        totalAmount: 0,
        totalCount: 0,
        completedAmount: 0,
        completedCount: 0,
        pendingAmount: 0,
        pendingCount: 0
      },
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Get donations error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ==================== ADMIN: ORDER MANAGEMENT ====================

// Admin - Get all orders with filters
router.get('/orders', authenticateAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 20, status, search, sortBy = 'orderDate', sortOrder = 'desc' } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Build query
    let query = {};
    if (status && status !== 'all') {
      query.status = status;
    }
    if (search) {
      query.$or = [
        { orderNumber: { $regex: search, $options: 'i' } },
        { 'customer.firstName': { $regex: search, $options: 'i' } },
        { 'customer.lastName': { $regex: search, $options: 'i' } },
        { 'customer.email': { $regex: search, $options: 'i' } },
        { 'customer.phone': { $regex: search, $options: 'i' } }
      ];
    }

    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const [orders, total] = await Promise.all([
      Order.find(query)
        .populate('items.product', 'name images')
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit)),
      Order.countDocuments(query)
    ]);

    // Get status counts
    const statusCounts = await Order.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    const stats = {
      total,
      pending: statusCounts.find(s => s._id === 'pending')?.count || 0,
      confirmed: statusCounts.find(s => s._id === 'confirmed')?.count || 0,
      processing: statusCounts.find(s => s._id === 'processing')?.count || 0,
      shipped: statusCounts.find(s => s._id === 'shipped')?.count || 0,
      delivered: statusCounts.find(s => s._id === 'delivered')?.count || 0,
      cancelled: statusCounts.find(s => s._id === 'cancelled')?.count || 0,
      refunded: statusCounts.find(s => s._id === 'refunded')?.count || 0
    };

    res.json({
      success: true,
      orders,
      stats,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get orders (admin) error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error',
      error: error.message 
    });
  }
});

// Admin - Get single order
router.get('/orders/:id', authenticateAdmin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('items.product', 'name images price');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      order
    });
  } catch (error) {
    console.error('Get order (admin) error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Admin - Update order status
router.put('/orders/:id/status', authenticateAdmin, async (req, res) => {
  try {
    const { status, notes } = req.body;
    const validStatuses = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'];

    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    order.status = status;
    if (notes) {
      order.notes = notes;
    }
    order.updatedAt = new Date();

    await order.save();

    res.json({
      success: true,
      message: 'Order status updated successfully',
      order
    });
  } catch (error) {
    console.error('Update order status (admin) error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Admin - Update order details
router.put('/orders/:id', authenticateAdmin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    const { customer, shippingAddress, status, notes } = req.body;

    if (customer) {
      if (customer.firstName) order.customer.firstName = customer.firstName;
      if (customer.lastName) order.customer.lastName = customer.lastName;
      if (customer.email) order.customer.email = customer.email;
      if (customer.phone) order.customer.phone = customer.phone;
    }

    if (shippingAddress) {
      Object.assign(order.shippingAddress, shippingAddress);
    }

    if (status) {
      const validStatuses = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'];
      if (validStatuses.includes(status)) {
        order.status = status;
      }
    }

    if (notes !== undefined) {
      order.notes = notes;
    }

    order.updatedAt = new Date();
    await order.save();

    res.json({
      success: true,
      message: 'Order updated successfully',
      order
    });
  } catch (error) {
    console.error('Update order (admin) error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

module.exports = router;
