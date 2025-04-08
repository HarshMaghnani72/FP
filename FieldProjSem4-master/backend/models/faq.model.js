const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    trim: true
  },
  answer: {
    type: String,
    required: false,
    default: ''
  },
  category: {
    type: String,
    required: true,
    trim: true,
    default: 'general'
  },
  status: {
    type: String,
    enum: ['pending', 'answered', 'rejected'],
    default: 'pending'
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('FAQ', faqSchema); 