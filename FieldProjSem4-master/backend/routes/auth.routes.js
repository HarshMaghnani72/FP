const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { auth } = require('../middleware/auth.middleware');
const { adminAuth } = require('../middleware/adminAuth.middleware');

// Register
router.post('/register', async (req, res) => {
  try {
    console.log('Registration request received:', { 
      email: req.body.email,
      name: req.body.name 
    });
    
    const { name, email, password } = req.body;
    
    // Validate input
    if (!name || !email || !password) {
      console.log('Missing required fields');
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password.length < 6) {
      console.log('Password too short');
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    console.log('Existing user check:', !!existingUser);
    
    if (existingUser) {
      console.log('Registration failed: User already exists');
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const user = new User({
      name,
      email,
      password
    });
    console.log('New user object created');

    // Save user
    await user.save();
    console.log('User saved successfully');

    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });
    console.log('Token generated successfully');

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    console.log('Registration successful, sending response');
    res.status(201).json({ user: userResponse, token });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(400).json({ 
      message: error.message || 'Registration failed',
      error: process.env.NODE_ENV === 'development' ? error : {}
    });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    console.log('Login request received:', { email: req.body.email });
    const { email, password } = req.body;
    
    // Find user
    const user = await User.findOne({ email });
    console.log('User found:', !!user);
    
    if (!user) {
      console.log('Login failed: User not found');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    console.log('Password match:', isMatch);
    
    if (!isMatch) {
      console.log('Login failed: Invalid password');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });
    console.log('Token generated successfully');

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    console.log('Login successful, sending response');
    res.json({ user: userResponse, token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(400).json({ 
      message: error.message || 'Login failed',
      error: process.env.NODE_ENV === 'development' ? error : {}
    });
  }
});

// Get current user
router.get('/me', auth, async (req, res) => {
  res.json(req.user);
});

// Logout
router.post('/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => token !== req.token);
    await req.user.save();
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create admin user
router.post('/create-admin', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new admin user
    const user = new User({
      name,
      email,
      password,
      role: 'admin'  // Set role as admin
    });

    await user.save();

    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json({ user: userResponse, token });
  } catch (error) {
    console.error('Admin creation error:', error);
    res.status(400).json({ 
      message: error.message || 'Admin creation failed',
      error: process.env.NODE_ENV === 'development' ? error : {}
    });
  }
});

// Update user to admin
router.put('/make-admin/:userId', adminAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.role = 'admin';
    await user.save();

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    res.json({ user: userResponse });
  } catch (error) {
    console.error('Make admin error:', error);
    res.status(400).json({ 
      message: error.message || 'Failed to make user admin',
      error: process.env.NODE_ENV === 'development' ? error : {}
    });
  }
});

// Create first admin user (no auth required)
router.post('/create-first-admin', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if any admin exists
    const adminExists = await User.findOne({ role: 'admin' });
    if (adminExists) {
      return res.status(400).json({ message: 'An admin user already exists' });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new admin user
    const user = new User({
      name,
      email,
      password,
      role: 'admin'
    });

    await user.save();

    // Generate token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json({
      user: userResponse,
      token
    });
  } catch (error) {
    console.error('Create first admin error:', error);
    res.status(400).json({ 
      message: error.message || 'Failed to create admin user',
      error: process.env.NODE_ENV === 'development' ? error : {}
    });
  }
});

module.exports = router; 