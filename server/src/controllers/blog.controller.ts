import { Request, Response } from "express";
import { Blog } from "../models/Blog";
import { cloudinary } from "../config/cloudinary";
import { z } from "zod";

const blogSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters."),
    excerpt: z.string().min(10, "Excerpt must be at least 10 characters.").max(300),
    content: z.string().min(20, "Content must be at least 20 characters."),
    image: z.string().url("Image must be a valid URL."),
    // Allow empty string (no upload) or a Cloudinary public_id
    imagePublicId: z.string().optional().transform((v) => v || undefined),
    category: z.string().min(1),
    author: z.string().optional(),
    tags: z.array(z.string()).optional(),
    published: z.boolean().optional(),
});

// ── GET /api/blogs ─────────────────────────────────────────────────────────
export async function getBlogs(req: Request, res: Response) {
    const { category, search, page = "1", limit = "10", published } = req.query;

    const query: Record<string, unknown> = {};

    if (published !== undefined) query.published = published === "true";
    if (category) query.category = category;
    if (search) query.$text = { $search: search as string };

    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
    const total = await Blog.countDocuments(query);
    const blogs = await Blog.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit as string));

    res.json({
        success: true,
        blogs,
        pagination: {
            total,
            page: parseInt(page as string),
            pages: Math.ceil(total / parseInt(limit as string)),
        },
    });
}

// ── GET /api/blogs/:id ─────────────────────────────────────────────────────
export async function getBlog(req: Request, res: Response) {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
        res.status(404).json({ success: false, message: "Blog not found." });
        return;
    }
    // Increment views
    blog.views += 1;
    await blog.save();

    res.json({ success: true, blog });
}

// ── POST /api/blogs ────────────────────────────────────────────────────────
export async function createBlog(req: Request, res: Response) {
    const parsed = blogSchema.safeParse(req.body);
    if (!parsed.success) {
        const fieldErrors = parsed.error.flatten().fieldErrors;
        const firstError = Object.entries(fieldErrors)
            .map(([field, msgs]) => `${field}: ${msgs?.[0]}`)
            .join(", ");
        res.status(400).json({
            success: false,
            message: firstError || "Validation failed.",
            errors: parsed.error.flatten(),
        });
        return;
    }

    const blog = await Blog.create(parsed.data);
    res.status(201).json({ success: true, blog });
}

// ── PUT /api/blogs/:id ─────────────────────────────────────────────────────
export async function updateBlog(req: Request, res: Response) {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!blog) {
        res.status(404).json({ success: false, message: "Blog not found." });
        return;
    }

    res.json({ success: true, blog });
}

// ── DELETE /api/blogs/:id ──────────────────────────────────────────────────
export async function deleteBlog(req: Request, res: Response) {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
        res.status(404).json({ success: false, message: "Blog not found." });
        return;
    }

    // Delete image from Cloudinary if it was uploaded there
    if (blog.imagePublicId) {
        await cloudinary.uploader.destroy(blog.imagePublicId);
    }

    await blog.deleteOne();
    res.json({ success: true, message: "Blog deleted successfully." });
}
