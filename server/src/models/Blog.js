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

blogSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Blog', blogSchema);
