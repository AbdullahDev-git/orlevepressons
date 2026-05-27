const express = require('express');
const router = express.Router();
const {
  getAllOrders,
  getOrder,
  getMyOrders,
  createOrder,
  updateOrderStatus,
  deleteOrder,
} = require('../controllers/orderController');
const { protect, protectAdmin } = require('../middleware/auth');

// Customer routes
router.get('/my-orders', protect, getMyOrders);
router.post('/', createOrder);

// Admin routes
router.get('/', protectAdmin, getAllOrders);
router.get('/:id', protectAdmin, getOrder);
router.put('/:id/status', protectAdmin, updateOrderStatus);
router.delete('/:id', protectAdmin, deleteOrder);

module.exports = router;