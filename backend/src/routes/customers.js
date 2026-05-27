const express = require('express');
const router = express.Router();
const {
  registerCustomer,
  loginCustomer,
  getCustomerProfile,
} = require('../controllers/customerController');
const { protect } = require('../middleware/auth');

// Public routes
router.post('/register', registerCustomer);
router.post('/login', loginCustomer);

// Protected routes
router.get('/profile', protect, getCustomerProfile);

module.exports = router;