const mongoose = require('mongoose');
require('dotenv').config();

const User = require('../models/user.model');

const checkUsers = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Get all users
    const users = await User.find({});
    console.log('\nUsers in database:');
    users.forEach(user => {
      console.log('\nUser:');
      console.log(`Name: ${user.name}`);
      console.log(`Email: ${user.email}`);
      console.log(`Role: ${user.role}`);
      console.log(`Created: ${user.createdAt}`);
    });

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('\nDisconnected from MongoDB');
  } catch (error) {
    console.error('Error checking users:', error);
    process.exit(1);
  }
};

checkUsers(); 