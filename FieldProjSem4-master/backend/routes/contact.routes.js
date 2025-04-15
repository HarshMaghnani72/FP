const express = require('express');
const router = express.Router();
const Contact = require('../models/contact.model');
const { adminAuth } = require('../middleware/auth.middleware');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');

// Create contact submission
router.post('/', async (req, res) => {
  try {
    console.log('Received contact submission:', req.body);
    
    // Validate required fields
    if (!req.body.name || !req.body.email || !req.body.message) {
      return res.status(400).json({ 
        message: 'Name, email, and message are required' 
      });
    }

    // Create contact with default subject if not provided
    const contactData = {
      ...req.body,
      subject: req.body.subject || 'General Inquiry'
    };

    console.log('Creating contact with data:', contactData);
    const contact = new Contact(contactData);
    await contact.save();
    console.log('Contact saved successfully:', contact);

    // Only attempt to send email if email configuration exists
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS && process.env.ADMIN_EMAIL) {
      try {
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
        console.log('Email notification sent successfully');
      } catch (emailError) {
        console.error('Failed to send email notification:', emailError);
        // Don't fail the request if email fails
      }
    } else {
      console.log('Email configuration not found, skipping email notification');
    }

    res.status(201).json(contact);
  } catch (error) {
    console.error('Error processing contact submission:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Validation Error',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get all contact submissions (admin only)
router.get('/', adminAuth, async (req, res) => {
  try {
    console.log('Fetching all contact messages');
    console.log('MongoDB connection state:', mongoose.connection.readyState);
    
    const count = await Contact.countDocuments();
    console.log('Total contacts in database:', count);
    
    const contacts = await Contact.find().sort({ createdAt: -1 });
    console.log(`Found ${contacts.length} contact messages:`, contacts);
    
    res.json(contacts);
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    res.status(500).json({ 
      message: 'Error fetching contact messages',
      error: error.message 
    });
  }
});

// Get single contact submission (admin only)
router.get('/:id', adminAuth, async (req, res) => {
  try {
    console.log(`Fetching contact message with ID: ${req.params.id}`);
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      console.log('Contact message not found');
      return res.status(404).json({ message: 'Contact submission not found' });
    }
    console.log('Contact message found:', contact);
    res.json(contact);
  } catch (error) {
    console.error('Error fetching contact message:', error);
    res.status(500).json({ message: error.message });
  }
});

// Update contact status (admin only)
router.patch('/:id', adminAuth, async (req, res) => {
  try {
    console.log(`Updating contact message with ID: ${req.params.id}`, req.body);
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      console.log('Contact message not found');
      return res.status(404).json({ message: 'Contact submission not found' });
    }

    if (req.body.status) {
      contact.status = req.body.status;
    }

    if (req.body.adminResponse) {
      contact.adminResponse = {
        message: req.body.adminResponse,
        repliedAt: new Date()
      };
    }

    await contact.save();
    console.log('Contact message updated successfully:', contact);
    res.json(contact);
  } catch (error) {
    console.error('Error updating contact message:', error);
    res.status(400).json({ message: error.message });
  }
});

// Delete contact submission (admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    console.log(`Deleting contact message with ID: ${req.params.id}`);
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      console.log('Contact message not found');
      return res.status(404).json({ message: 'Contact submission not found' });
    }

    await contact.deleteOne();
    console.log('Contact message deleted successfully');
    res.json({ message: 'Contact submission deleted successfully' });
  } catch (error) {
    console.error('Error deleting contact message:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 