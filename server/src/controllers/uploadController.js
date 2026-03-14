const asyncHandler = require('express-async-handler');
const ErrorResponse = require('../utils/errorResponse');
const cloudinary = require('../utils/cloudinary');

// @desc    Upload image to cloudinary
// @route   POST /api/upload/image
// @access  Private
exports.uploadImage = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    return next(new ErrorResponse('Please upload a file', 400));
  }

  const folder = req.query.folder || 'metacode';

  const stream = cloudinary.uploader.upload_stream(
    { folder },
    (error, result) => {
      if (error) {
        return next(new ErrorResponse('Upload failed', 500));
      }
      res.status(200).json({
        success: true,
        url: result.secure_url,
        publicId: result.public_id
      });
    }
  );

  stream.end(req.file.buffer);
});

// @desc    Delete image from cloudinary
// @route   DELETE /api/upload/image
// @access  Private
exports.deleteImage = asyncHandler(async (req, res, next) => {
  const { publicId } = req.body;

  if (!publicId) {
    return next(new ErrorResponse('Please provide publicId', 400));
  }

  await cloudinary.uploader.destroy(publicId);

  res.status(200).json({ success: true, message: 'Image deleted' });
});
