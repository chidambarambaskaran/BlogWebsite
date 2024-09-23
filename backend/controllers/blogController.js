const Blog = require('../models/Blog');

exports.createBlog = async (req, res) => {
    const { content } = req.body;
    try {
        const blog = new Blog({ content, user: req.user._id });
        await blog.save();
        res.status(201).json(blog);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getBlogsByUser = async (req, res) => {
    try {
        const blogs = await Blog.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
