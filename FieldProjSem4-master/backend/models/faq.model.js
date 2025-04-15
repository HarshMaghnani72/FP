const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema({
  question: String,
  answer: String,
  category: String,
  status: String,
  isActive: Boolean
}, {
  timestamps: true
});

// No validation, no middleware, just a simple schema
module.exports = mongoose.model('FAQ', faqSchema); 