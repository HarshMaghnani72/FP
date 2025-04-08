const mongoose = require('mongoose');
const User = require('../models/user.model');
require('dotenv').config();

const createUser = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Create user
        const newUser = new User({
            name: 'New User',
            email: 'newuser@example.com',
            password: 'password123', // This will be hashed automatically
            role: 'user'
        });

        // Save the user
        await newUser.save();
        console.log('User created successfully');
        
        // Disconnect from MongoDB
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

createUser(); 