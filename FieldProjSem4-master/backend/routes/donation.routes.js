const express = require('express');
const router = express.Router();
const Donation = require('../models/donation.model');

// Create a new donation
router.post('/', async (req, res) => {
  try {
    const donation = new Donation(req.body);
    const savedDonation = await donation.save();
    res.status(201).json(savedDonation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all donations
router.get('/', async (req, res) => {
  try {
    const donations = await Donation.find().sort({ createdAt: -1 });
    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific donation
router.get('/:id', async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }
    res.json(donation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update donation status
router.patch('/:id', async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }
    
    if (req.body.status) {
      donation.status = req.body.status;
    }
    
    const updatedDonation = await donation.save();
    res.json(updatedDonation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a donation
router.delete('/:id', async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }
    await donation.deleteOne();
    res.json({ message: 'Donation deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 