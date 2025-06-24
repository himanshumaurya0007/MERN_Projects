const express = require('express');
const router = express.Router();
const {    getAllBlogs, getBlogsByCategory, getBlogsByTag, getBlogBySlug} = require('../controllers/blogController');

router.get('/category/:category', getBlogsByCategory);
router.get('/tag/:tag', getBlogsByTag);
router.get('/:slug', getBlogBySlug);
router.get('/', getAllBlogs);

module.exports = router;