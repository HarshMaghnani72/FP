const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

// File path for storing FAQs
const FAQ_FILE = path.join(__dirname, '../data/faqs.json');

// Ensure data directory exists
const ensureDataDirectory = async () => {
  const dataDir = path.dirname(FAQ_FILE);
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
};

// Read FAQs from file
const readFAQs = async () => {
  try {
    await ensureDataDirectory();
    const data = await fs.readFile(FAQ_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
};

// Write FAQs to file
const writeFAQs = async (faqs) => {
  await ensureDataDirectory();
  await fs.writeFile(FAQ_FILE, JSON.stringify(faqs, null, 2));
};

// Get all FAQs
router.get('/', async (req, res) => {
  try {
    const faqs = await readFAQs();
    res.json(faqs);
  } catch (error) {
    console.error('Error reading FAQs:', error);
    res.status(500).json({ message: 'Error reading FAQs' });
  }
});

// Get FAQ by ID
router.get('/:id', async (req, res) => {
  try {
    const faqs = await readFAQs();
    const faq = faqs.find(f => f.id === req.params.id);
    if (!faq) {
      return res.status(404).json({ message: 'FAQ not found' });
    }
    res.json(faq);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching FAQ' });
  }
});

// Submit a new FAQ
router.post('/submit', async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({ message: 'Question is required' });
    }

    const faqs = await readFAQs();
    const newFAQ = {
      id: Date.now().toString(),
      question,
      answer: '',
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    faqs.push(newFAQ);
    await writeFAQs(faqs);

    res.status(201).json(newFAQ);
  } catch (error) {
    console.error('Error submitting FAQ:', error);
    res.status(500).json({ message: 'Error submitting FAQ' });
  }
});

// Update FAQ status (admin only)
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { answer, status } = req.body;

    const faqs = await readFAQs();
    const index = faqs.findIndex(faq => faq.id === id);

    if (index === -1) {
      return res.status(404).json({ message: 'FAQ not found' });
    }

    if (answer) faqs[index].answer = answer;
    if (status) faqs[index].status = status;

    await writeFAQs(faqs);
    res.json(faqs[index]);
  } catch (error) {
    console.error('Error updating FAQ:', error);
    res.status(500).json({ message: 'Error updating FAQ' });
  }
});

module.exports = router; 