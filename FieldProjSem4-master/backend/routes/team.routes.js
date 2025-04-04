const express = require('express');
const router = express.Router();
const Team = require('../models/team.model');
const { adminAuth } = require('../middleware/auth.middleware');
const multer = require('multer');
const path = require('path');

// Configure multer for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/team')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5000000 // 5MB limit
  },
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb('Error: Images only!');
    }
  }
});

// Get all active team members
router.get('/', async (req, res) => {
  try {
    const team = await Team.find({ isActive: true }).sort({ order: 1 });
    res.json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all team members (admin only)
router.get('/all', adminAuth, async (req, res) => {
  try {
    const team = await Team.find().sort({ order: 1 });
    res.json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single team member
router.get('/:id', async (req, res) => {
  try {
    const member = await Team.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Team member not found' });
    }
    res.json(member);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create team member (admin only)
router.post('/', adminAuth, upload.single('image'), async (req, res) => {
  try {
    const member = new Team({
      ...req.body,
      image: req.file ? `/uploads/team/${req.file.filename}` : null
    });
    await member.save();
    res.status(201).json(member);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update team member (admin only)
router.patch('/:id', adminAuth, upload.single('image'), async (req, res) => {
  try {
    const member = await Team.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Team member not found' });
    }

    Object.keys(req.body).forEach(update => {
      member[update] = req.body[update];
    });

    if (req.file) {
      member.image = `/uploads/team/${req.file.filename}`;
    }

    await member.save();
    res.json(member);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete team member (admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const member = await Team.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Team member not found' });
    }

    await member.deleteOne();
    res.json({ message: 'Team member deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 