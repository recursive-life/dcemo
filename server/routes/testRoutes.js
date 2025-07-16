const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');

// Test database connection
router.get('/db-test', async (req, res) => {
  try {
    // Test creating a simple document
    const testUser = new User({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    });
    
    await testUser.save();
    await User.deleteOne({ email: 'test@example.com' });
    
    res.json({
      success: true,
      message: 'Database connection and operations working correctly',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Database test failed',
      error: error.message
    });
  }
});

// Get database stats
router.get('/db-stats', async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const productCount = await Product.countDocuments();
    const orderCount = await Order.countDocuments();
    
    res.json({
      success: true,
      stats: {
        users: userCount,
        products: productCount,
        orders: orderCount
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get database stats',
      error: error.message
    });
  }
});

module.exports = router; 