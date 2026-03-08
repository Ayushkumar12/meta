const cloudinary = require('../config/cloudinary');

const uploadToCloudinary = async (fileBuffer, folder) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folder || process.env.CLOUDINARY_ORDERS_FOLDER,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    uploadStream.end(fileBuffer);
  });
};

module.exports = uploadToCloudinary;
