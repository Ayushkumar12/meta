const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');
const upload = require('../config/multer');
const { protect } = require('../middleware/authMiddleware');

router.post('/image', protect, upload.single('image'), uploadController.uploadImage);
router.delete('/image', protect, uploadController.deleteImage);

module.exports = router;
