const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  try {
    if (this.isModified('password')) {
      console.log('Hashing password for user:', this.email);
      this.password = await bcrypt.hash(this.password, 8);
      console.log('Password hashed successfully');
    }
    next();
  } catch (error) {
    console.error('Error hashing password:', error);
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(password) {
  try {
    console.log('Comparing password for user:', this.email);
    const isMatch = await bcrypt.compare(password, this.password);
    console.log('Password comparison result:', isMatch);
    return isMatch;
  } catch (error) {
    console.error('Error comparing password:', error);
    throw error;
  }
};

module.exports = mongoose.model('User', userSchema); 