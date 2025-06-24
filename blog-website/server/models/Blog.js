const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    excerpt: { type: String, required: true, default: '' },
    coverImage: { type: String, default: '' },

    tags: { type: [String], default: [] },
    category: { type: String, required: true },

    readingTime: { type: String, default: '0 min read' },
    views: { type: Number, default: 0 },

    author: {
        name: { type: String, default: 'Demo User', required: true },
        email: { type: String, default: 'demouser@example.com' },
    },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Blog', blogSchema);