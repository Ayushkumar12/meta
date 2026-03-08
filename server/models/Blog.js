import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title']
    },
    excerpt: {
        type: String,
        required: [true, 'Please add an excerpt']
    },
    content: {
        type: String,
        required: [true, 'Please add content']
    },
    image: {
        type: String,
        default: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop'
    },
    imagePublicId: {
        type: String
    },
    category: {
        type: String,
        required: [true, 'Please add a category']
    },
    author: {
        type: String,
        required: [true, 'Please add an author']
    },
    tags: [String],
    published: {
        type: Boolean,
        default: true
    },
    views: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

export default mongoose.model('Blog', blogSchema);
