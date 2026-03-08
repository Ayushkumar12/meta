const express = require('express');
const { register, login, getMe, setupAdmin } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.post('/setup', setupAdmin);

module.exports = router;
