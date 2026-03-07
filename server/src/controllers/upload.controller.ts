import { Request, Response } from "express";
import multer from "multer";
import { cloudinary } from "../config/cloudinary";
import { Readable } from "stream";

// Use memory storage — we'll stream the buffer to Cloudinary
const storage = multer.memoryStorage();

export const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
    fileFilter: (_req, file, cb) => {
        if (file.mimetype.startsWith("image/")) {
            cb(null, true);
        } else {
            cb(new Error("Only image files are allowed."));
        }
    },
});

// Helper: upload buffer to Cloudinary
function uploadToCloudinary(
    buffer: Buffer,
    folder: string
): Promise<{ url: string; publicId: string }> {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder, resource_type: "image" },
            (error, result) => {
                if (error || !result) return reject(error);
                resolve({ url: result.secure_url, publicId: result.public_id });
            }
        );
        Readable.from(buffer).pipe(stream);
    });
}

// ── POST /api/upload/image ────────────────────────────────────────────────
// Accepts: multipart/form-data with field "image"
// Optional query: ?folder=blogs|avatars|misc
export async function uploadImage(req: Request, res: Response) {
    if (!req.file) {
        res.status(400).json({ success: false, message: "No image file provided." });
        return;
    }

    const folder = `metacode/${(req.query.folder as string) || "misc"}`;
    const result = await uploadToCloudinary(req.file.buffer, folder);

    res.json({
        success: true,
        url: result.url,
        publicId: result.publicId,
    });
}

// ── DELETE /api/upload/image ──────────────────────────────────────────────
// Body: { publicId: string }
export async function deleteImage(req: Request, res: Response) {
    const { publicId } = req.body;
    if (!publicId) {
        res.status(400).json({ success: false, message: "publicId is required." });
        return;
    }

    await cloudinary.uploader.destroy(publicId);
    res.json({ success: true, message: "Image deleted from Cloudinary." });
}
