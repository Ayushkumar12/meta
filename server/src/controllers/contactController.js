const asyncHandler = require('express-async-handler');
const ErrorResponse = require('../utils/errorResponse');
const Contact = require('../models/Contact');

// @desc    Get all contacts
// @route   GET /api/contacts
// @access  Private
exports.getContacts = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;

  const total = await Contact.countDocuments();
  const unread = await Contact.countDocuments({ read: false });

  const contacts = await Contact.find()
    .sort('-createdAt')
    .skip(startIndex)
    .limit(limit);

  res.status(200).json({
    success: true,
    contacts,
    pagination: {
      total,
      pages: Math.ceil(total / limit),
      unread
    }
  });
});

// @desc    Submit contact form
// @route   POST /api/contacts
// @access  Public
exports.submitContact = asyncHandler(async (req, res, next) => {
  const contact = await Contact.create(req.body);
  res.status(201).json({ success: true, contact });
});

// @desc    Mark contact as read
// @route   PATCH /api/contacts/:id/read
// @access  Private
exports.markRead = asyncHandler(async (req, res, next) => {
  const contact = await Contact.findByIdAndUpdate(
    req.params.id,
    { read: true },
    { new: true }
  );

  if (!contact) {
    return next(new ErrorResponse(`Contact not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({ success: true, contact });
});

// @desc    Mark contact as replied
// @route   PATCH /api/contacts/:id/replied
// @access  Private
exports.markReplied = asyncHandler(async (req, res, next) => {
  const contact = await Contact.findByIdAndUpdate(
    req.params.id,
    { replied: true },
    { new: true }
  );

  if (!contact) {
    return next(new ErrorResponse(`Contact not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({ success: true, contact });
});

// @desc    Delete contact
// @route   DELETE /api/contacts/:id
// @access  Private
exports.deleteContact = asyncHandler(async (req, res, next) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    return next(new ErrorResponse(`Contact not found with id of ${req.params.id}`, 404));
  }

  await contact.deleteOne();

  res.status(200).json({ success: true, message: 'Contact deleted' });
});
