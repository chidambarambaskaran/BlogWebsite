const express = require('express');
const Blog = require('../models/Blog'); // Ensure this path is correct
const authMiddleware = require('../middleware/auth'); // Ensure this path is correct

const router = express.Router();

// Add Blog
router.post('/', authMiddleware, async (req, res) => {
    const { content } = req.body;
    if (!content) {
        return res.status(400).json({ message: 'Content is required' });
    }

    try {
        const newBlog = await Blog.create({ content, user: req.user.id });
        res.status(201).json(newBlog);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get Blogs
router.get('/', authMiddleware, async (req, res) => {
    try {
        const blogs = await Blog.find({ user: req.user.id });
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
