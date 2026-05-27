const express = require('express');
const router = express.Router();
const { loginAdmin, getDashboardStats, getDashboardStatsV2, getAnalytics, getContactMessages } = require('../controllers/adminController');
const { protectAdmin } = require('../middleware/auth');

router.post('/login', loginAdmin);
router.get('/dashboard', protectAdmin, getDashboardStats);
router.get('/dashboard/stats', protectAdmin, getDashboardStatsV2);
router.get('/analytics', protectAdmin, getAnalytics);
router.get('/messages', protectAdmin, getContactMessages);

module.exports = router;
