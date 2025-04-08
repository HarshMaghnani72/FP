const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const auth = async (req, res, next) => {
  try {
    console.log('Auth Middleware - Headers:', req.headers);
    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log('Auth Middleware - Token:', token ? 'Present' : 'Missing');
    
    if (!token) {
      console.log('Auth Middleware - No token provided');
      throw new Error();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Auth Middleware - Token decoded:', decoded);
    
    const user = await User.findOne({ _id: decoded.id });
    console.log('Auth Middleware - User found:', !!user);

    if (!user) {
      console.log('Auth Middleware - No user found for token');
      throw new Error();
    }

    req.user = user;
    req.token = token;
    console.log('Auth Middleware - Authentication successful');
    next();
  } catch (error) {
    console.error('Auth Middleware - Error:', error.message);
    res.status(401).json({ message: 'Please authenticate' });
  }
};

const adminAuth = async (req, res, next) => {
  try {
    await auth(req, res, () => {
      if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Admin only.' });
      }
      next();
    });
  } catch (error) {
    res.status(401).json({ message: 'Please authenticate' });
  }
};

module.exports = { auth, adminAuth }; 