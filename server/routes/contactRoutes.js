const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/', contactController.submitContact);

router.use(protect);
router.use(authorize('admin'));

router.get('/', contactController.getContacts);
router.patch('/:id/read', contactController.markRead);
router.patch('/:id/replied', contactController.markReplied);
router.delete('/:id', contactController.deleteContact);

module.exports = router;
