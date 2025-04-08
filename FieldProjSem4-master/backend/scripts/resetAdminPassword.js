const mongoose = require('mongoose');
const User = require('../models/user.model');
require('dotenv').config();

const resetAdminPassword = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Find admin user
    const admin = await User.findOne({ email: 'admin@example.com' });
    if (!admin) {
      console.log('Admin user not found');
      return;
    }

    // Reset password
    admin.password = 'admin123';
    await admin.save();
    console.log('\nAdmin password reset successfully');
    console.log('Email: admin@example.com');
    console.log('Password: admin123');

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('\nDisconnected from MongoDB');
  } catch (error) {
    console.error('Error resetting admin password:', error);
    process.exit(1);
  }
};

resetAdminPassword(); 