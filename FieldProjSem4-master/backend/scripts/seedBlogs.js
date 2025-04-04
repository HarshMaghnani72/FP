const mongoose = require('mongoose');
const Blog = require('../models/blog.model');
require('dotenv').config();

const sampleBlogs = [
  {
    title: "Immunization for the Children",
    content: "Immunization or vaccination is the process of giving a person a vaccine in order to protect them against diseases. It is important to immunize children as early as possible, as vaccines are the only way to protect against serious illnesses that can cause severe complications and even death.",
    excerpt: "Learn about the importance of childhood immunization and how it protects against serious diseases.",
    image: "/images/vaccine.jpg",
    author: "Dr. Sarah Johnson",
    category: "Health"
  },
  {
    title: "The Strength of Single Parenting",
    content: "Single parenting is a journey filled with challenges, resilience, and unconditional love. Juggling responsibilities alone—whether emotional, financial, or daily tasks—can be overwhelming, yet it shapes individuals into strong, resourceful caregivers. Despite the struggles, single parents create a nurturing environment, proving that love and dedication matter more than the number of parents in a household. Their ability to balance work, home, and personal growth is nothing short of inspiring.",
    excerpt: "Discover the challenges and triumphs of single parenting, and how it builds strength and resilience.",
    image: "/images/strength.jpg",
    author: "Maria Rodriguez",
    category: "Parenting"
  },
  {
    title: "Balancing Work and Single Parenthood",
    content: "Being a single parent while managing a career can feel overwhelming, but with the right strategies, it's possible to create a healthy balance. Prioritizing tasks, setting realistic goals, and establishing routine can help reduce stress. Remember, taking small breaths and seeking support from family or community can make a big difference. You're not alone in this journey—find what works best for you and your child.",
    excerpt: "Practical tips and strategies for balancing work responsibilities with single parenting.",
    image: "/images/blog-work-balance.jpg",
    author: "James Wilson",
    category: "Work-Life Balance"
  },
  {
    title: "Self-Care for Single Parents: Why It Matters",
    content: "Taking care of yourself is just as important as caring for your child. As a single parent, it's easy to put your needs last, but small acts of self-care—like enjoying a quiet cup of tea, reading a book, or taking a short walk—can recharge your mind and body. Prioritizing your well-being helps you stay strong, patient, and present for your child. Remember, a happy and healthy parent creates a happy home!",
    excerpt: "Learn why self-care is crucial for single parents and how to incorporate it into your daily routine.",
    image: "/images/blog-self-care.jpg",
    author: "Dr. Emily Chen",
    category: "Wellness"
  },
  {
    title: "Financial Planning for Single Parents",
    content: "Managing finances as a single parent can feel challenging, but with smart planning, financial stability is achievable. Creating a budget, prioritizing savings, and exploring financial assistance programs can help secure a brighter future for you and your child. Small, consistent steps—like tracking expenses and setting financial goals—can lead to long-term stability. Remember, financial security is not just about money; it's about peace of mind for you and your family.",
    excerpt: "Essential financial planning tips and strategies for single parents.",
    image: "/images/blog-finance.jpg",
    author: "Michael Thompson",
    category: "Finance"
  },
  {
    title: "Raising a Happy and Confident Child Alone",
    content: "Being a single parent comes with challenges, but it also brings unique opportunities to build a strong and loving bond with your child. Encouraging open communication, providing emotional support, and celebrating small achievements help boost their confidence. Your love, guidance, and presence are the key ingredients in raising a happy and secure child. Remember, it's not about having two parents—it's about having one who truly cares.",
    excerpt: "Guidance on raising confident and happy children as a single parent.",
    image: "/images/blog-happy-child.jpg",
    author: "Lisa Anderson",
    category: "Child Development"
  }
];

const seedBlogs = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing blogs
    await Blog.deleteMany({});
    console.log('Cleared existing blogs');

    // Insert sample blogs
    const blogs = await Blog.insertMany(sampleBlogs);
    console.log(`Successfully seeded ${blogs.length} blog posts`);

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error seeding blogs:', error);
    process.exit(1);
  }
};

seedBlogs(); 