const express = require('express');
const router = express.Router();
const FAQ = require('../models/faq.model');
const { adminAuth } = require('../middleware/auth.middleware');

// Get all active FAQs
router.get('/', async (req, res) => {
  try {
    console.log('Fetching all active FAQs...');
    
    // First, check all FAQs in the database
    const allFaqs = await FAQ.find();
    console.log('All FAQs in database:', {
      total: allFaqs.length,
      active: allFaqs.filter(f => f.isActive).length,
      inactive: allFaqs.filter(f => !f.isActive).length,
      categories: [...new Set(allFaqs.map(f => f.category))],
      statuses: [...new Set(allFaqs.map(f => f.status))]
    });
    
    // Then get only active FAQs
    const activeFaqs = await FAQ.find({ isActive: true })
      .sort({ category: 1, order: 1 });
    console.log('Active FAQs:', {
      total: activeFaqs.length,
      categories: [...new Set(activeFaqs.map(f => f.category))]
    });
    
    res.json(activeFaqs);
  } catch (error) {
    console.error('Error fetching FAQs:', error);
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

// Submit FAQ question (for users)
router.post('/submit', async (req, res) => {
  try {
    const { question } = req.body;
    console.log('Submitting new FAQ question:', { question });
    
    if (!question) {
      console.log('Question submission failed: No question provided');
      return res.status(400).json({ message: 'Question is required' });
    }
    
    const faq = new FAQ({
      question,
      answer: '', // Will be filled by admin later
      status: 'pending',
      isActive: false, // Not visible until answered by admin
      category: 'user-submitted'
    });
    
    console.log('Creating new FAQ:', {
      question: faq.question,
      status: faq.status,
      isActive: faq.isActive,
      category: faq.category
    });
    
    await faq.save();
    console.log('FAQ saved successfully:', { id: faq._id });
    
    res.status(201).json({ 
      message: 'Question submitted successfully',
      faq 
    });
  } catch (error) {
    console.error('Error submitting FAQ:', error);
    res.status(500).json({ message: 'Failed to submit question' });
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

// Create demo FAQs
router.post('/demo', async (req, res) => {
  try {
    const demoFaqs = [
      {
        question: "What is ParentPlus?",
        answer: "ParentPlus is a comprehensive platform designed to help parents manage their children's education, activities, and development. It provides tools for tracking academic progress, managing schedules, and facilitating communication between parents and educators.",
        category: "general",
        status: "answered",
        isActive: true,
        order: 1
      },
      {
        question: "How do I track my child's progress?",
        answer: "You can track your child's progress through the dashboard. It shows academic performance, attendance records, and upcoming events. You can also set goals and monitor their achievement over time.",
        category: "features",
        status: "answered",
        isActive: true,
        order: 2
      },
      {
        question: "Can I communicate with teachers through ParentPlus?",
        answer: "Yes! ParentPlus provides a secure messaging system that allows you to communicate directly with your child's teachers. You can schedule meetings, ask questions, and receive updates about your child's progress.",
        category: "communication",
        status: "answered",
        isActive: true,
        order: 3
      }
    ];

    // Clear existing demo FAQs
    await FAQ.deleteMany({ category: { $in: ['general', 'features', 'communication'] } });
    
    // Insert new demo FAQs
    const createdFaqs = await FAQ.insertMany(demoFaqs);
    
    console.log('Demo FAQs created:', {
      total: createdFaqs.length,
      categories: [...new Set(createdFaqs.map(f => f.category))]
    });
    
    res.status(201).json(createdFaqs);
  } catch (error) {
    console.error('Error creating demo FAQs:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get all FAQs (including pending) - Admin only
router.get('/admin/all', adminAuth, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    const faqs = await FAQ.find().sort({ createdAt: -1 });
    
    console.log('Admin fetching all FAQs:', {
      total: faqs.length,
      byStatus: faqs.reduce((acc, faq) => {
        acc[faq.status] = (acc[faq.status] || 0) + 1;
        return acc;
      }, {}),
      byCategory: [...new Set(faqs.map(faq => faq.category))]
    });

    res.json(faqs);
  } catch (error) {
    console.error('Error fetching all FAQs:', error);
    res.status(500).json({ message: 'Error fetching FAQs' });
  }
});

// Update FAQ status - Admin only
router.put('/admin/:id', adminAuth, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    const { status, answer, isActive } = req.body;
    const faq = await FAQ.findById(req.params.id);

    if (!faq) {
      return res.status(404).json({ message: 'FAQ not found' });
    }

    faq.status = status;
    if (answer) faq.answer = answer;
    if (typeof isActive === 'boolean') faq.isActive = isActive;

    await faq.save();
    console.log('FAQ updated:', { id: faq._id, status, isActive });

    res.json(faq);
  } catch (error) {
    console.error('Error updating FAQ:', error);
    res.status(500).json({ message: 'Error updating FAQ' });
  }
});

module.exports = router; 