const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// @desc Upload image
// @route POST /api/upload/image
exports.uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'Please upload a file' });
        }

        res.status(200).json({
            success: true,
            url: req.file.path,
            publicId: req.file.filename
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc Delete image
// @route DELETE /api/upload/image
exports.deleteImage = async (req, res) => {
    try {
        const { publicId } = req.body;
        if (!publicId) {
            return res.status(400).json({ success: false, message: 'Please provide publicId' });
        }

        await cloudinary.uploader.destroy(publicId);

        res.status(200).json({
            success: true,
            message: 'Image deleted from Cloudinary'
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
