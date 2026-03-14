const express = require('express');
const multer = require('multer');
const { uploadImage, deleteImage } = require('../controllers/uploadController');
const { protect } = require('../middleware/auth');

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/image', protect, upload.single('image'), uploadImage);
router.delete('/image', protect, deleteImage);

module.exports = router;
