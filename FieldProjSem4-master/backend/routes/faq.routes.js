const express = require('express');
const router = express.Router();
const FAQ = require('../models/faq.model');
const { adminAuth } = require('../middleware/auth.middleware');

// Get all active FAQs
router.get('/', async (req, res) => {
  try {
    const faqs = await FAQ.find({ isActive: true })
      .sort({ category: 1, order: 1 });
    res.json(faqs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all FAQs (admin only)
router.get('/all', adminAuth, async (req, res) => {
  try {
    const faqs = await FAQ.find().sort({ category: 1, order: 1 });
    res.json(faqs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get FAQs by category
router.get('/category/:category', async (req, res) => {
  try {
    const faqs = await FAQ.find({ 
      category: req.params.category,
      isActive: true 
    }).sort({ order: 1 });
    res.json(faqs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single FAQ
router.get('/:id', async (req, res) => {
  try {
    const faq = await FAQ.findById(req.params.id);
    if (!faq) {
      return res.status(404).json({ message: 'FAQ not found' });
    }
    res.json(faq);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create FAQ (admin only)
router.post('/', adminAuth, async (req, res) => {
  try {
    const faq = new FAQ(req.body);
    await faq.save();
    res.status(201).json(faq);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update FAQ (admin only)
router.patch('/:id', adminAuth, async (req, res) => {
  try {
    const faq = await FAQ.findById(req.params.id);
    if (!faq) {
      return res.status(404).json({ message: 'FAQ not found' });
    }

    Object.keys(req.body).forEach(update => {
      faq[update] = req.body[update];
    });

    await faq.save();
    res.json(faq);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete FAQ (admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const faq = await FAQ.findById(req.params.id);
    if (!faq) {
      return res.status(404).json({ message: 'FAQ not found' });
    }

    await faq.deleteOne();
    res.json({ message: 'FAQ deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 