import mongoose, { Document, Schema } from "mongoose";

export interface IBlog extends Document {
    title: string;
    excerpt: string;
    content: string;
    image: string;
    imagePublicId?: string; // Cloudinary public_id for deletion
    category: string;
    author: string;
    tags: string[];
    published: boolean;
    views: number;
    createdAt: Date;
    updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>(
    {
        title: { type: String, required: true, trim: true },
        excerpt: { type: String, required: true, maxlength: 300 },
        content: { type: String, required: true },
        image: { type: String, required: true },
        imagePublicId: { type: String },
        category: { type: String, required: true, trim: true },
        author: { type: String, required: true, default: "MetaCode Team" },
        tags: [{ type: String, trim: true }],
        published: { type: Boolean, default: true },
        views: { type: Number, default: 0 },
    },
    { timestamps: true }
);

// Text index for search
BlogSchema.index({ title: "text", content: "text", excerpt: "text" });

export const Blog = mongoose.model<IBlog>("Blog", BlogSchema);
