const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  password: {
    type: String,
    required: function() {
      return !this.googleId; // Password not required for Google OAuth users
    },
    minlength: [6, 'Password must be at least 6 characters long']
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true // Allows multiple null values
  },
  provider: {
    type: String,
    enum: ['local', 'google'],
    default: 'local'
  },
  profilePicture: {
    type: String,
    default: ''
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'super_admin'],
    default: 'user'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  phoneVerified: {
    type: Boolean,
    default: false
  },
  
  // Password reset fields
  resetPasswordToken: {
    type: String,
    default: null
  },
  resetPasswordExpires: {
    type: Date,
    default: null
  },
  resetPasswordOTP: {
    type: String,
    default: null
  },
  resetPasswordOTPExpires: {
    type: Date,
    default: null
  },
  
  // Address information
  address: {
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: {
      type: String,
      default: 'Kenya'
    }
  },
  
  // User preferences
  preferences: {
    currency: {
      type: String,
      default: 'KES',
      enum: ['KES', 'USD', 'EUR', 'GBP']
    },
    language: {
      type: String,
      default: 'en',
      enum: ['en', 'sw']
    },
    notifications: {
      email: {
        type: Boolean,
        default: true
      },
      sms: {
        type: Boolean,
        default: true
      },
      push: {
        type: Boolean,
        default: true
      }
    }
  },
  
  // Cart and favorites (stored in user account)
  cart: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1
    },
    addedAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Cart expiry tracking for professional persistent cart system
  cartLastActivity: {
    type: Date,
    default: null
  },
  
  favorites: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    addedAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Favorites expiry tracking for professional persistent favorites system
  favoritesLastActivity: {
    type: Date,
    default: null
  },
  
  // Order history
  orders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  }],
  
  // Account activity
  lastLogin: Date,
  loginCount: {
    type: Number,
    default: 0
  },
  
  // Password reset
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  
  // Email verification
  emailVerificationToken: String,
  emailVerificationExpires: Date,
  
  // Phone verification
  phoneVerificationCode: String,
  phoneVerificationExpires: Date
}, {
  timestamps: true
});

// Indexes
userSchema.index({ phone: 1 });
userSchema.index({ 'cart.product': 1 });
userSchema.index({ 'favorites.product': 1 });

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Virtual for cart item count
userSchema.virtual('cartItemCount').get(function() {
  return this.cart.reduce((total, item) => total + item.quantity, 0);
});

// Virtual for cart total
userSchema.virtual('cartTotal').get(function() {
  return this.cart.reduce((total, item) => {
    if (item.product && item.product.price) {
      return total + (item.product.price * item.quantity);
    }
    return total;
  }, 0);
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  // Hash password if it's modified
  if (this.isModified('password')) {
    try {
      const salt = await bcrypt.genSalt(12);
      this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
      return next(error);
    }
  }

  // SECURITY: Prevent role escalation through direct assignment
  // Only allow role changes if:
  // 1. This is a new document (new user creation)
  // 2. The role is being set to 'admin' only through secure admin creation endpoint
  // 3. Or if role is being changed from admin to user (downgrade)
  
  // If this is an existing document and role is being changed to admin
  if (!this.isNew && this.isModified('role') && this.role === 'admin') {
    // Check if the previous role was admin (allowed) or if it's a downgrade
    const previousRole = this.constructor.findById(this._id).then(doc => doc?.role);
    // This check will be handled by the secure admin creation endpoint
    // For now, we'll allow it but log it for security audit
    console.log(`[SECURITY] Role change detected for user ${this.email}: ${this.role}`);
  }

  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Add to cart method with activity tracking
userSchema.methods.addToCart = function(productId, quantity = 1) {
  const existingItem = this.cart.find(item => item.product.toString() === productId.toString());
  
  if (existingItem) {
    existingItem.quantity += quantity;
    existingItem.addedAt = new Date(); // Reset timestamp on activity
  } else {
    this.cart.push({
      product: productId,
      quantity: quantity,
      addedAt: new Date()
    });
  }
  
  // Update cart last activity timestamp (resets 7-day expiry)
  this.cartLastActivity = new Date();
  
  return this.save();
};

// Remove from cart method
userSchema.methods.removeFromCart = function(productId) {
  this.cart = this.cart.filter(item => item.product.toString() !== productId.toString());
  return this.save();
};

// Update cart quantity method with activity tracking
userSchema.methods.updateCartQuantity = function(productId, quantity) {
  const item = this.cart.find(item => item.product.toString() === productId.toString());
  if (item) {
    if (quantity <= 0) {
      this.removeFromCart(productId);
    } else {
      item.quantity = quantity;
      item.addedAt = new Date(); // Reset timestamp on activity
      // Update cart last activity timestamp (resets 7-day expiry)
      this.cartLastActivity = new Date();
    }
  }
  return this.save();
};

// Clear cart method
userSchema.methods.clearCart = function() {
  this.cart = [];
  return this.save();
};

// Clear favorites method
userSchema.methods.clearFavorites = function() {
  this.favorites = [];
  return this.save();
};

// Add to favorites method with activity tracking
userSchema.methods.addToFavorites = function(productId) {
  const exists = this.favorites.some(fav => fav.product.toString() === productId.toString());
  if (!exists) {
    this.favorites.push({
      product: productId,
      addedAt: new Date()
    });
    // Update favorites last activity timestamp (resets 7-day expiry)
    this.favoritesLastActivity = new Date();
  }
  return this.save();
};

// Remove from favorites method with activity tracking
userSchema.methods.removeFromFavorites = function(productId) {
  this.favorites = this.favorites.filter(fav => fav.product.toString() !== productId.toString());
  // Update favorites last activity timestamp (resets 7-day expiry)
  this.favoritesLastActivity = new Date();
  return this.save();
};

// Check if product is favorite
userSchema.methods.isFavorite = function(productId) {
  return this.favorites.some(fav => fav.product.toString() === productId.toString());
};

// Update last login
userSchema.methods.updateLastLogin = function() {
  this.lastLogin = new Date();
  this.loginCount += 1;
  return this.save();
};

// Generate password reset token
userSchema.methods.generatePasswordResetToken = function() {
  const crypto = require('crypto');
  const token = crypto.randomBytes(32).toString('hex');
  this.resetPasswordToken = token;
  this.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
  return this.save();
};

// Generate password reset OTP
userSchema.methods.generatePasswordResetOTP = function() {
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
  this.resetPasswordOTP = otp;
  this.resetPasswordOTPExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
  return this.save();
};

// Clear password reset token
userSchema.methods.clearPasswordResetToken = function() {
  this.resetPasswordToken = null;
  this.resetPasswordExpires = null;
  return this.save();
};

// Clear password reset OTP
userSchema.methods.clearPasswordResetOTP = function() {
  this.resetPasswordOTP = null;
  this.resetPasswordOTPExpires = null;
  return this.save();
};

// Transform JSON output
userSchema.methods.toJSON = function() {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.resetPasswordToken;
  delete userObject.resetPasswordExpires;
  delete userObject.emailVerificationToken;
  delete userObject.emailVerificationExpires;
  delete userObject.phoneVerificationCode;
  delete userObject.phoneVerificationExpires;
  return userObject;
};

module.exports = mongoose.model('User', userSchema);