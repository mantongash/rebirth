const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../models/User');
const { authenticateToken } = require('../middleware/auth');
const EmailService = require('../services/emailService');
const SMSService = require('../services/smsService');

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password, address } = req.body;

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

    // Create new user
    const user = new User({
      firstName,
      lastName,
      email,
      phone,
      password,
      address: address || {}
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: user.toJSON(),
        token
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to register user',
      error: error.message
    });
  }
});

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // Find user by email
    const user = await User.findOne({ email }).populate('cart.product favorites.product');
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Account is deactivated. Please contact support.'
      });
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password);
    
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Update last login
    await user.updateLastLogin();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: user.toJSON(),
        token
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to login',
      error: error.message
    });
  }
});

// @route   GET /api/auth/me
// @desc    Get current user profile
// @access  Private
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
      .populate('cart.product favorites.product')
      .select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: {
        user: user.toJSON()
      }
    });

  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get user profile',
      error: error.message
    });
  }
});

// @route   PUT /api/auth/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const { firstName, lastName, phone, address, preferences } = req.body;
    
    const user = await User.findById(req.user.userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Update allowed fields
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (phone) user.phone = phone;
    if (address) user.address = { ...user.address, ...address };
    if (preferences) user.preferences = { ...user.preferences, ...preferences };

    await user.save();

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        user: user.toJSON()
      }
    });

  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update profile',
      error: error.message
    });
  }
});

// @route   POST /api/auth/cart/add
// @desc    Add item to user's cart
// @access  Private
router.post('/cart/add', authenticateToken, async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: 'Product ID is required'
      });
    }

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    await user.addToCart(productId, quantity);
    await user.populate('cart.product');

    res.json({
      success: true,
      message: 'Item added to cart',
      data: {
        cart: user.cart,
        cartItemCount: user.cartItemCount,
        cartTotal: user.cartTotal
      }
    });

  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add item to cart',
      error: error.message
    });
  }
});

// @route   DELETE /api/auth/cart/remove/:productId
// @desc    Remove item from user's cart
// @access  Private
router.delete('/cart/remove/:productId', authenticateToken, async (req, res) => {
  try {
    const { productId } = req.params;

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    await user.removeFromCart(productId);
    await user.populate('cart.product');

    res.json({
      success: true,
      message: 'Item removed from cart',
      data: {
        cart: user.cart,
        cartItemCount: user.cartItemCount,
        cartTotal: user.cartTotal
      }
    });

  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to remove item from cart',
      error: error.message
    });
  }
});

// @route   PUT /api/auth/cart/update
// @desc    Update cart item quantity
// @access  Private
router.put('/cart/update', authenticateToken, async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || quantity === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Product ID and quantity are required'
      });
    }

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    await user.updateCartQuantity(productId, quantity);
    await user.populate('cart.product');

    res.json({
      success: true,
      message: 'Cart updated successfully',
      data: {
        cart: user.cart,
        cartItemCount: user.cartItemCount,
        cartTotal: user.cartTotal
      }
    });

  } catch (error) {
    console.error('Update cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update cart',
      error: error.message
    });
  }
});

// @route   DELETE /api/auth/cart/clear
// @desc    Clear user's cart
// @access  Private
router.delete('/cart/clear', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    await user.clearCart();

    res.json({
      success: true,
      message: 'Cart cleared successfully',
      data: {
        cart: [],
        cartItemCount: 0,
        cartTotal: 0
      }
    });

  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to clear cart',
      error: error.message
    });
  }
});

// @route   POST /api/auth/cart/clear
// @desc    Clear user's cart (alt method for clients that prefer POST)
// @access  Private
router.post('/cart/clear', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    await user.clearCart();

    res.json({
      success: true,
      message: 'Cart cleared successfully',
      data: {
        cart: [],
        cartItemCount: 0,
        cartTotal: 0
      }
    });

  } catch (error) {
    console.error('Clear cart (POST) error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to clear cart',
      error: error.message
    });
  }
});

// @route   GET /api/auth/cart
// @desc    Get user's cart with 7-day retention filtering (professional standard)
// @access  Private
router.get('/cart', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).populate('cart.product');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    const now = Date.now();
    const sevenDaysMs = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
    const originalCartLength = user.cart.length;
    
    // Filter items older than 7 days
    user.cart = user.cart.filter(ci => {
      if (!ci.addedAt) return false; // Remove items without timestamps
      return (now - new Date(ci.addedAt).getTime()) <= sevenDaysMs;
    });
    
    // Update cart last activity timestamp
    if (user.cart.length > 0) {
      user.cartLastActivity = new Date();
    }
    
    // Save changes if cart was modified
    if (user.cart.length !== originalCartLength) {
      await user.save();
      await user.populate('cart.product');
    }
    
    return res.json({
      success: true,
      data: {
        cart: user.cart,
        cartItemCount: user.cartItemCount,
        cartTotal: user.cartTotal,
        cartExpiry: user.cartLastActivity ? new Date(user.cartLastActivity.getTime() + sevenDaysMs) : null
      }
    });
  } catch (error) {
    console.error('Get cart error:', error);
    return res.status(500).json({ success: false, message: 'Failed to get cart', error: error.message });
  }
});

// @route   POST /api/auth/favorites/add
// @desc    Add item to user's favorites
// @access  Private
router.post('/favorites/add', authenticateToken, async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: 'Product ID is required'
      });
    }

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    await user.addToFavorites(productId);
    await user.populate('favorites.product');

    res.json({
      success: true,
      message: 'Item added to favorites',
      data: {
        favorites: user.favorites
      }
    });

  } catch (error) {
    console.error('Add to favorites error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add item to favorites',
      error: error.message
    });
  }
});

// @route   DELETE /api/auth/favorites/remove/:productId
// @desc    Remove item from user's favorites
// @access  Private
router.delete('/favorites/remove/:productId', authenticateToken, async (req, res) => {
  try {
    const { productId } = req.params;

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    await user.removeFromFavorites(productId);
    await user.populate('favorites.product');

    res.json({
      success: true,
      message: 'Item removed from favorites',
      data: {
        favorites: user.favorites
      }
    });

  } catch (error) {
    console.error('Remove from favorites error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to remove item from favorites',
      error: error.message
    });
  }
});

// @route   GET /api/auth/favorites
// @desc    Get user's favorites with 7-day retention filtering (professional standard)
// @access  Private
router.get('/favorites', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).populate('favorites.product');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const now = Date.now();
    const sevenDaysMs = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
    const originalFavoritesLength = user.favorites.length;
    
    // Filter favorites older than 7 days
    user.favorites = user.favorites.filter(fav => {
      if (!fav.addedAt) return false; // Remove favorites without timestamps
      return (now - new Date(fav.addedAt).getTime()) <= sevenDaysMs;
    });
    
    // Update favorites last activity timestamp
    if (user.favorites.length > 0) {
      user.favoritesLastActivity = new Date();
    }
    
    // Save changes if favorites were modified
    if (user.favorites.length !== originalFavoritesLength) {
      await user.save();
      await user.populate('favorites.product');
    }

    res.json({
      success: true,
      data: {
        favorites: user.favorites,
        favoritesExpiry: user.favoritesLastActivity ? new Date(user.favoritesLastActivity.getTime() + sevenDaysMs) : null
      }
    });

  } catch (error) {
    console.error('Get favorites error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get favorites',
      error: error.message
    });
  }
});

// @route   DELETE /api/auth/favorites/clear
// @desc    Clear user's favorites
// @access  Private
router.delete('/favorites/clear', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    await user.clearFavorites();

    res.json({
      success: true,
      message: 'Favorites cleared successfully',
      data: {
        favorites: []
      }
    });

  } catch (error) {
    console.error('Clear favorites error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to clear favorites',
      error: error.message
    });
  }
});

// @route   POST /api/auth/favorites/clear
// @desc    Clear user's favorites (alt method for clients that prefer POST)
// @access  Private
router.post('/favorites/clear', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    await user.clearFavorites();

    res.json({
      success: true,
      message: 'Favorites cleared successfully',
      data: {
        favorites: []
      }
    });

  } catch (error) {
    console.error('Clear favorites (POST) error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to clear favorites',
      error: error.message
    });
  }
});

// @route   GET /api/auth/google
// @desc    Google OAuth login
// @access  Public
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

// @route   GET /api/auth/google/callback
// @desc    Google OAuth callback
// @access  Public
router.get('/google/callback', 
  passport.authenticate('google', { session: false }),
  async (req, res) => {
    try {
      const user = req.user;
      
      // Generate JWT token
      const token = jwt.sign(
        { userId: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      // Update last login
      await user.updateLastLogin();

      res.redirect(`${process.env.CLIENT_URL}/auth/success?token=${token}&user=${encodeURIComponent(JSON.stringify({
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        profilePicture: user.profilePicture
      }))}`);
    } catch (error) {
      console.error('Google OAuth callback error:', error);
      res.redirect(`${process.env.CLIENT_URL}/auth/error?message=${encodeURIComponent('Authentication failed')}`);
    }
  }
);

// @route   POST /api/auth/forgot-password
// @desc    Send password reset email
// @access  Public
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Generate reset token
    await user.generatePasswordResetToken();

    // Send reset email
    await EmailService.sendPasswordResetEmail(user.email, user.resetPasswordToken);

    res.json({
      success: true,
      message: 'Password reset email sent successfully'
    });

  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send password reset email',
      error: error.message
    });
  }
});

// @route   POST /api/auth/forgot-password-sms
// @desc    Send password reset SMS
// @access  Public
router.post('/forgot-password-sms', async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({
        success: false,
        message: 'Phone number is required'
      });
    }

    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Generate reset OTP
    await user.generatePasswordResetOTP();

    // Send reset SMS
    await SMSService.sendPasswordResetSMS(user.phone, user.resetPasswordOTP);

    res.json({
      success: true,
      message: 'Password reset SMS sent successfully'
    });

  } catch (error) {
    console.error('Forgot password SMS error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send password reset SMS',
      error: error.message
    });
  }
});

// @route   POST /api/auth/reset-password
// @desc    Reset password with token
// @access  Public
router.post('/reset-password', async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Token and new password are required'
      });
    }

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired reset token'
      });
    }

    // Update password
    user.password = newPassword;
    await user.clearPasswordResetToken();
    await user.save();

    res.json({
      success: true,
      message: 'Password reset successfully'
    });

  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to reset password',
      error: error.message
    });
  }
});

// @route   POST /api/auth/reset-password-otp
// @desc    Reset password with OTP
// @access  Public
router.post('/reset-password-otp', async (req, res) => {
  try {
    const { phone, otp, newPassword } = req.body;

    if (!phone || !otp || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Phone, OTP, and new password are required'
      });
    }

    const user = await User.findOne({
      phone,
      resetPasswordOTP: otp,
      resetPasswordOTPExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired OTP'
      });
    }

    // Update password
    user.password = newPassword;
    await user.clearPasswordResetOTP();
    await user.save();

    res.json({
      success: true,
      message: 'Password reset successfully'
    });

  } catch (error) {
    console.error('Reset password OTP error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to reset password',
      error: error.message
    });
  }
});

module.exports = router;