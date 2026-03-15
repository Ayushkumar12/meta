const express = require('express');
const multer = require('multer');
const { uploadImage, deleteImage } = require('../controllers/uploadController');
const { protect } = require('../middleware/auth');

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only images are allowed'), false);
    }
  }
});

router.post('/image', protect, upload.single('image'), uploadImage);
router.delete('/image', protect, deleteImage);

module.exports = router;
