const mongoose = require('mongoose');
const User = require('../models/user.model');
require('dotenv').config();

const listUsers = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Get all users
        const users = await User.find({}, 'name email role');
        console.log('\nUsers in database:');
        users.forEach(user => {
            console.log(`- ${user.name} (${user.email}) - Role: ${user.role}`);
        });
        
        // Disconnect from MongoDB
        await mongoose.disconnect();
        console.log('\nDisconnected from MongoDB');
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

listUsers(); 