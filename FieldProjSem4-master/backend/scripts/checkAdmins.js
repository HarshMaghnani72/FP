const mongoose = require('mongoose');
const User = require('../models/user.model');
require('dotenv').config();

const checkAdmins = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Find all admin users
    const admins = await User.find({ role: 'admin' });
    console.log('\nAdmin users in database:');
    if (admins.length === 0) {
      console.log('No admin users found');
    } else {
      admins.forEach(admin => {
        console.log('\nAdmin:');
        console.log(`Name: ${admin.name}`);
        console.log(`Email: ${admin.email}`);
        console.log(`Created: ${admin.createdAt}`);
      });
    }

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('\nDisconnected from MongoDB');
  } catch (error) {
    console.error('Error checking admin users:', error);
    process.exit(1);
  }
};

checkAdmins(); 