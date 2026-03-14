const express = require('express');
const {
  getContacts,
  submitContact,
  markRead,
  markReplied,
  deleteContact
} = require('../controllers/contactController');

const router = express.Router();

const { protect } = require('../middleware/auth');

router
  .route('/')
  .get(protect, getContacts)
  .post(submitContact);

router.patch('/:id/read', protect, markRead);
router.patch('/:id/replied', protect, markReplied);
router.delete('/:id', protect, deleteContact);

module.exports = router;
