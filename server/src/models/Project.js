const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        enum: ['website', 'graphics', 'social_media'],
        default: 'website'
    },
    image: {
        type: String,
        required: true
    },
    imagePublicId: {
        type: String,
        required: true
    },
    year: {
        type: String,
        default: new Date().getFullYear().toString()
    },
    description: {
        type: String,
        trim: true
    },
    longDescription: {
        type: String,
        trim: true
    },
    client: {
        type: String,
        trim: true
    },
    role: {
        type: String,
        trim: true
    },
    stack: [{
        type: String
    }],
    link: {
        type: String,
        trim: true
    },
    published: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);
