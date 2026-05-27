const express = require('express');
const router = express.Router();
const { submitContact, getAllMessages, markAsRead, deleteMessage } = require('../controllers/contactController');
const { protectAdmin } = require('../middleware/auth');

router.post('/', submitContact);
router.get('/all', protectAdmin, getAllMessages);
router.put('/:id/read', protectAdmin, markAsRead);
router.delete('/:id', protectAdmin, deleteMessage);

module.exports = router;
