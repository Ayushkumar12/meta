const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true
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
    default: 'no-photo.jpg'
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
    default: false
  },
  views: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Indexing for faster queries
blogSchema.index({ published: 1, createdAt: -1 });
blogSchema.index({ category: 1 });

blogSchema.pre('save', function() {
  this.updatedAt = Date.now();
});

// Cascading delete: Remove image from Cloudinary when blog is deleted
blogSchema.post('deleteOne', { document: true, query: false }, async function() {
  if (this.imagePublicId) {
    const cloudinary = require('../utils/cloudinary');
    try {
      await cloudinary.uploader.destroy(this.imagePublicId);
    } catch (err) {
      console.error('Cloudinary Image Autodelete Failed:', err);
    }
  }
});

module.exports = mongoose.model('Blog', blogSchema, 'blogs');
