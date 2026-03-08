const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/login', authController.login);
router.post('/setup', authController.setup);
router.get('/me', protect, authController.getMe);
router.post('/users', protect, authorize('admin'), authController.createUser);

module.exports = router;
