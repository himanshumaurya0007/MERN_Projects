const Blog = require("../models/Blog");

const getAllBlogs = async (req, res) => {
    try {
        const getAllBlogPost = await Blog.find().sort({ createdAt: -1 });
        res.json(getAllBlogPost);
    } catch (err) {
        res.status(500).json({ err: "Server error while fetching blogs!" });
    }
};

const getBlogsByCategory = async (req, res) => {
    try {
        const getAllBlogsByCategory = await Blog.find({ category: req.params.category }).sort({ createdAt: -1 });
        res.status(200).json(getAllBlogsByCategory);
    } catch (err) {
        res.status(500).json({ err: "Failed to fetch blogs by category!" });
    }
};

const getBlogsByTag = async (req, res) => {
    try {
        const getAllBlogsByTag = await Blog.find({ tags: req.params.tag }).sort({ createdAt: -1 });
        res.status(200).json(getAllBlogsByTag);
    } catch (err) {
        res.status(500).json({ err: "Failed to fetch blogs by tag!" });
    }
};

const getBlogBySlug = async (req, res) => {
    try {
        const getSingleBlogBySlug = await Blog.findOne({slug: req.params.slug}).sort({createdAt: -1});
        if (!getSingleBlogBySlug) return res.status(404).json({message: "Blog not found!"});
        res.status(200).json(getSingleBlogBySlug);
    } catch (err) {
        res.status(500).json({ err: "Failed to fetch blog!" });
    }
};

module.exports = {
    getAllBlogs,
    getBlogsByCategory,
    getBlogsByTag,
    getBlogBySlug
}