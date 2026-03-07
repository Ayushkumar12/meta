// ⚠️ MUST be the very first import — loads .env BEFORE any other module runs
// In Node.js/CommonJS, all imports are evaluated before module body executes,
// so dotenv.config() in the body runs AFTER cloudinary.config() has already
// used process.env (with undefined values). Using 'dotenv/config' as an
// import fixes this by running dotenv during the import resolution phase.
import "dotenv/config";

import express from "express";
import cors from "cors";
import "express-async-errors";

import { connectDB } from "./config/db";
import { errorHandler } from "./middleware/errorHandler";

// Routes
import authRoutes from "./routes/auth.routes";
import blogRoutes from "./routes/blog.routes";
import contactRoutes from "./routes/contact.routes";
import uploadRoutes from "./routes/upload.routes";

const app = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ──────────────────────────────────────────────────────────────
app.use(
    cors({
        origin: process.env.CLIENT_URL || "http://localhost:5173",
        credentials: true,
    })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ── Routes ──────────────────────────────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/upload", uploadRoutes);

// Health check
app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", message: "MetaCode API is running 🚀" });
});

// ── Error Handler ────────────────────────────────────────────────────────────
app.use(errorHandler);

// ── Start Server ─────────────────────────────────────────────────────────────
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`\n🚀 MetaCode Server running on http://localhost:${PORT}`);
        console.log(`📦 Environment: ${process.env.NODE_ENV}`);
        console.log(`☁  Cloudinary: ${process.env.CLOUDINARY_CLOUD_NAME ? "✅ configured" : "❌ missing CLOUDINARY_CLOUD_NAME"}`);
    });
});
