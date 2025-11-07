const User = require('../models/User');

/**
 * Professional Cart & Favorites Cleanup Service
 * Automatically removes expired carts and favorites to maintain database optimization
 * and implement professional expiry standards (7 days for users, 2-3 days for guests)
 */
class CartCleanupService {
  constructor() {
    this.isRunning = false;
    this.cleanupInterval = null;
  }

  /**
   * Start the automatic cart cleanup service
   * Runs every 24 hours to clean up expired carts
   */
  start() {
    if (this.isRunning) {
      console.log('Cart cleanup service is already running');
      return;
    }

    console.log('Starting cart cleanup service...');
    this.isRunning = true;

    // Run cleanup immediately
    this.cleanupExpiredCarts();

    // Schedule cleanup every 24 hours
    this.cleanupInterval = setInterval(() => {
      this.cleanupExpiredCarts();
    }, 24 * 60 * 60 * 1000); // 24 hours
  }

  /**
   * Stop the cart cleanup service
   */
  stop() {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
    }
    this.isRunning = false;
    console.log('Cart cleanup service stopped');
  }

  /**
   * Clean up expired carts and favorites from the database
   */
  async cleanupExpiredCarts() {
    try {
      console.log('Starting cart and favorites cleanup process...');
      const now = new Date();
      const sevenDaysAgo = new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000));

      // Find users with expired cart activity
      const usersWithExpiredCarts = await User.find({
        cartLastActivity: { $lt: sevenDaysAgo },
        cart: { $exists: true, $not: { $size: 0 } }
      });

      // Find users with expired favorites activity
      const usersWithExpiredFavorites = await User.find({
        favoritesLastActivity: { $lt: sevenDaysAgo },
        favorites: { $exists: true, $not: { $size: 0 } }
      });

      let cleanedUsers = 0;
      let totalCartItemsRemoved = 0;
      let totalFavoritesRemoved = 0;

      // Clean up expired carts
      for (const user of usersWithExpiredCarts) {
        const originalCartLength = user.cart.length;
        
        // Clear expired cart
        user.cart = [];
        user.cartLastActivity = null;
        
        await user.save();
        
        cleanedUsers++;
        totalCartItemsRemoved += originalCartLength;
        
        console.log(`Cleaned expired cart for user ${user._id}: ${originalCartLength} items removed`);
      }

      // Clean up expired favorites
      for (const user of usersWithExpiredFavorites) {
        const originalFavoritesLength = user.favorites.length;
        
        // Clear expired favorites
        user.favorites = [];
        user.favoritesLastActivity = null;
        
        await user.save();
        
        cleanedUsers++;
        totalFavoritesRemoved += originalFavoritesLength;
        
        console.log(`Cleaned expired favorites for user ${user._id}: ${originalFavoritesLength} items removed`);
      }

      console.log(`Cleanup completed: ${cleanedUsers} users cleaned, ${totalCartItemsRemoved} cart items removed, ${totalFavoritesRemoved} favorites removed`);
      
      return {
        success: true,
        cleanedUsers,
        totalCartItemsRemoved,
        totalFavoritesRemoved,
        timestamp: now
      };

    } catch (error) {
      console.error('Cleanup error:', error);
      return {
        success: false,
        error: error.message,
        timestamp: new Date()
      };
    }
  }

  /**
   * Get cleanup service status
   */
  getStatus() {
    return {
      isRunning: this.isRunning,
      hasInterval: !!this.cleanupInterval,
      nextCleanup: this.cleanupInterval ? 'Every 24 hours' : 'Not scheduled'
    };
  }

  /**
   * Manual cleanup trigger (for testing or immediate cleanup)
   */
  async manualCleanup() {
    console.log('Manual cart cleanup triggered');
    return await this.cleanupExpiredCarts();
  }
}

// Create singleton instance
const cartCleanupService = new CartCleanupService();

module.exports = cartCleanupService;
