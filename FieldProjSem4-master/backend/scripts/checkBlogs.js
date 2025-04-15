const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/field-project')
  .then(() => {
    console.log('Connected to MongoDB successfully');
    checkBlogs();
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });

async function checkBlogs() {
  try {
    const Blog = require('../models/blog.model');
    const blogs = await Blog.find();
    console.log('Found blogs:', blogs.length);
    blogs.forEach(blog => {
      console.log('Blog:', {
        id: blog._id,
        title: blog.title,
        status: blog.status,
        author: blog.author
      });
    });
    process.exit(0);
  } catch (error) {
    console.error('Error checking blogs:', error);
    process.exit(1);
  }
} 