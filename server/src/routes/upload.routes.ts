import { Router } from "express";
import { upload, uploadImage, deleteImage } from "../controllers/upload.controller";
import { protect } from "../middleware/auth";

const router = Router();

// Admin only — upload image to Cloudinary, returns { url, publicId }
router.post("/image", protect, upload.single("image"), uploadImage);

// Admin only — delete image from Cloudinary by publicId
router.delete("/image", protect, deleteImage);

export default router;
