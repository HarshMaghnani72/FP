const mongoose = require('mongoose');
const FAQ = require('../models/faq.model');
require('dotenv').config();

const sampleFAQs = [
  {
    question: "What is ParentPlus?",
    answer: "ParentPlus is a comprehensive platform designed to help parents manage their children's education, activities, and development. It provides tools for tracking academic progress, managing schedules, and facilitating communication between parents and educators.",
    category: "general",
    status: "answered",
    isActive: true,
    order: 1
  },
  {
    question: "How do I track my child's progress?",
    answer: "You can track your child's progress through the dashboard. It shows academic performance, attendance records, and upcoming events. You can also set goals and monitor their achievement over time.",
    category: "features",
    status: "answered",
    isActive: true,
    order: 2
  },
  {
    question: "Can I communicate with teachers through ParentPlus?",
    answer: "Yes! ParentPlus provides a secure messaging system that allows you to communicate directly with your child's teachers. You can schedule meetings, ask questions, and receive updates about your child's progress.",
    category: "communication",
    status: "answered",
    isActive: true,
    order: 3
  },
  {
    question: "How do I make a donation?",
    answer: "You can make a donation by visiting the Donate page and following the simple steps. We accept various payment methods including credit cards, debit cards, and online banking.",
    category: "donations",
    status: "answered",
    isActive: true,
    order: 4
  },
  {
    question: "Is my personal information secure?",
    answer: "Yes, we take security very seriously. All your personal information is encrypted and stored securely. We follow industry-standard security practices to protect your data.",
    category: "security",
    status: "answered",
    isActive: true,
    order: 5
  }
];

async function createSampleFAQs() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/field-project');
    console.log('Connected to MongoDB');

    // Clear existing FAQs
    await FAQ.deleteMany({});
    console.log('Cleared existing FAQs');

    // Insert sample FAQs
    const createdFAQs = await FAQ.insertMany(sampleFAQs);
    console.log('Created sample FAQs:', createdFAQs.length);

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

createSampleFAQs(); 