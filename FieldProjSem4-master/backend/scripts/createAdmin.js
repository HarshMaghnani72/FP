const mongoose = require('mongoose');
const User = require('../models/user.model');
require('dotenv').config();

const createAdmin = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Create admin user
        const adminUser = new User({
            name: 'System Admin',
            email: 'system.admin@example.com',
            password: 'admin123',
            role: 'admin'
        });

        await adminUser.save();
        console.log('Admin user created successfully');
        console.log('Email: system.admin@example.com');
        console.log('Password: admin123');

        // Disconnect from MongoDB
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    } catch (error) {
        console.error('Error creating admin user:', error);
        process.exit(1);
    }
};

createAdmin(); 