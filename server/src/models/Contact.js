const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  company: {
    type: String
  },
  service: {
    type: String
  },
  budget: {
    type: String
  },
  message: {
    type: String,
    required: [true, 'Please add a message']
  },
  read: {
    type: Boolean,
    default: false
  },
  replied: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Indexing for faster admin queries
contactSchema.index({ read: 1, createdAt: -1 });

module.exports = mongoose.model('Contact', contactSchema, 'contacts');
