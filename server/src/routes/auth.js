const express = require('express');
const {
  register,
  login,
  getMe,
  setupAdmin,
  createUser
} = require('../controllers/authController');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

router.post('/login', login);
router.post('/setup', setupAdmin);
router.get('/me', protect, getMe);
router.post('/users', protect, authorize('admin'), createUser);

module.exports = router;
