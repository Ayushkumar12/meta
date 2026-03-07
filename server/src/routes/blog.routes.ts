import { Router } from "express";
import {
    getBlogs,
    getBlog,
    createBlog,
    updateBlog,
    deleteBlog,
} from "../controllers/blog.controller";
import { protect } from "../middleware/auth";

const router = Router();

// Public
router.get("/", getBlogs);
router.get("/:id", getBlog);

// Admin only
router.post("/", protect, createBlog);
router.put("/:id", protect, updateBlog);
router.delete("/:id", protect, deleteBlog);

export default router;
