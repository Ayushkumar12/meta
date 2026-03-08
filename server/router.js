import express from 'express';
import * as ctrl from './controllers.js';
import { protect, authorize } from './middleware.js';
import upload from './config/multer.js';

const router = express.Router();

// --- Misc ---
router.get('/ping', ctrl.ping);
router.get('/data', ctrl.getData);

// --- Auth ---
router.post('/auth/login', ctrl.login);
router.post('/auth/setup', ctrl.setup);
router.get('/auth/me', protect, ctrl.getMe);
router.post('/auth/users', protect, authorize('admin'), ctrl.createUser);

// --- Blogs ---
router.get('/blogs', ctrl.getBlogs);
router.get('/blogs/:id', ctrl.getBlog);
router.post('/blogs', protect, authorize('admin', 'editor'), ctrl.createBlog);
router.put('/blogs/:id', protect, authorize('admin', 'editor'), ctrl.updateBlog);
router.delete('/blogs/:id', protect, authorize('admin', 'editor'), ctrl.deleteBlog);

// --- Contacts ---
router.post('/contacts', ctrl.submitContact);
router.get('/contacts', protect, authorize('admin'), ctrl.getContacts);
router.patch('/contacts/:id/read', protect, authorize('admin'), ctrl.markRead);
router.patch('/contacts/:id/replied', protect, authorize('admin'), ctrl.markReplied);
router.delete('/contacts/:id', protect, authorize('admin'), ctrl.deleteContact);

// --- Upload ---
router.post('/upload/image', protect, upload.single('image'), ctrl.uploadImage);
router.delete('/upload/image', protect, ctrl.deleteImage);

export default router;
