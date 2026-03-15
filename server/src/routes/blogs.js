const express = require('express');
const {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog
} = require('../controllers/blogController');

const router = express.Router();

const { protect } = require('../middleware/auth');
const { cacheMiddleware, clearCache } = require('../middleware/cache');

router
  .route('/')
  .get(cacheMiddleware(300), getBlogs) // Cache for 5 mins
  .post(protect, (req, res, next) => {
    clearCache();
    next();
  }, createBlog);

router
  .route('/:id')
  .get(cacheMiddleware(600), getBlog) // Cache details for 10 mins
  .put(protect, (req, res, next) => {
    clearCache();
    next();
  }, updateBlog)
  .delete(protect, (req, res, next) => {
    clearCache();
    next();
  }, deleteBlog);

module.exports = router;
