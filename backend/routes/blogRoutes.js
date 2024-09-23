const express = require('express');
const { createBlog, getBlogsByUser } = require('../controllers/blogController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, createBlog);
router.get('/', protect, getBlogsByUser);

module.exports = router;
