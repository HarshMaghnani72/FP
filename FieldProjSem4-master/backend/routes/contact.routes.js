const express = require('express');
const router = express.Router();
const Contact = require('../models/contact.model');
const { adminAuth } = require('../middleware/auth.middleware');
const nodemailer = require('nodemailer');

// Create contact submission
router.post('/', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();

    // Send email notification
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact Form Submission: ${contact.subject}`,
      text: `
        Name: ${contact.name}
        Email: ${contact.email}
        Subject: ${contact.subject}
        Message: ${contact.message}
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json(contact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all contact submissions (admin only)
router.get('/', adminAuth, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single contact submission (admin only)
router.get('/:id', adminAuth, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact submission not found' });
    }
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update contact status (admin only)
router.patch('/:id', adminAuth, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact submission not found' });
    }

    if (req.body.status) {
      contact.status = req.body.status;
    }

    await contact.save();
    res.json(contact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete contact submission (admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact submission not found' });
    }

    await contact.deleteOne();
    res.json({ message: 'Contact submission deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 