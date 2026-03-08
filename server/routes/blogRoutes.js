const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', blogController.getBlogs);
router.get('/:id', blogController.getBlog);

router.use(protect); // All routes below are protected
router.use(authorize('admin', 'editor'));

router.post('/', blogController.createBlog);
router.put('/:id', blogController.updateBlog);
router.delete('/:id', blogController.deleteBlog);

module.exports = router;
