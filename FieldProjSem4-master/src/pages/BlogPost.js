import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { blogAPI } from '../services/api';
import './BlogPost.css';
import Footer from '../components/Footer/Footer';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // For static data, we'll use a mock blog if the ID is numeric
        if (id && !isNaN(parseInt(id))) {
          // This is for the static blog data
          const mockBlogs = [
            {
              _id: "1",
              title: "Immunization for the Children",
              content: "Immunization or vaccination is the process of giving a person a vaccine in order to protect them against diseases. It is important to immunize children as early as possible, as vaccines are the only way to protect against serious illnesses that can cause severe complications and even death.",
              image: "/images/vaccine.jpg",
              author: "Dr. Sarah Johnson",
              createdAt: "2023-05-15T10:30:00Z",
              category: "Health",
              tags: ["vaccination", "children", "health"]
            },
            {
              _id: "2",
              title: "The Strength of Single Parenting",
              content: "Single parenting is a journey filled with challenges, resilience, and unconditional love. Juggling responsibilities alone—whether emotional, financial, or daily tasks—can be overwhelming, yet it shapes individuals into strong, resourceful caregivers. Despite the struggles, single parents create a nurturing environment, proving that love and dedication matter more than the number of parents in a household. Their ability to balance work, home, and personal growth is nothing short of inspiring.",
              image: "/images/strength.jpg",
              author: "Michael Chen",
              createdAt: "2023-06-20T14:45:00Z",
              category: "Parenting",
              tags: ["single parenting", "resilience", "family"]
            },
            {
              _id: "3",
              title: "Balancing Work and Single Parenthood",
              content: "Being a single parent while managing a career can feel overwhelming, but with the right strategies, it's possible to create a healthy balance. Prioritizing tasks, setting realistic goals, and establishing routine can help reduce stress. Remember, taking small breaths and seeking support from family or community can make a big difference. You're not alone in this journey—find what works best for you and your child.",
              image: "/images/blog-work-balance.jpg",
              author: "Lisa Rodriguez",
              createdAt: "2023-07-10T09:15:00Z",
              category: "Work-Life Balance",
              tags: ["work", "parenting", "balance"]
            },
            {
              _id: "4",
              title: "Self-Care for Single Parents: Why It Matters",
              content: "Taking care of yourself is just as important as caring for your child. As a single parent, it's easy to put your needs last, but small acts of self-care—like enjoying a quiet cup of tea, reading a book, or taking a short walk—can recharge your mind and body. Prioritizing your well-being helps you stay strong, patient, and present for your child. Remember, a happy and healthy parent creates a happy home!",
              image: "/images/blog-self-care.jpg",
              author: "Emma Thompson",
              createdAt: "2023-08-05T11:20:00Z",
              category: "Self-Care",
              tags: ["self-care", "wellness", "parenting"]
            },
            {
              _id: "5",
              title: "Financial Planning for Single Parents",
              content: "Managing finances as a single parent can feel challenging, but with smart planning, financial stability is achievable. Creating a budget, prioritizing savings, and exploring financial assistance programs can help secure a brighter future for you and your child. Small, consistent steps—like tracking expenses and setting financial goals—can lead to long-term stability. Remember, financial security is not just about money; it's about peace of mind for you and your family.",
              image: "/images/blog-finance.jpg",
              author: "David Wilson",
              createdAt: "2023-09-12T16:30:00Z",
              category: "Finance",
              tags: ["finance", "budgeting", "planning"]
            },
            {
              _id: "6",
              title: "Raising a Happy and Confident Child Alone",
              content: "Being a single parent comes with challenges, but it also brings unique opportunities to build a strong and loving bond with your child. Encouraging open communication, providing emotional support, and celebrating small achievements help boost their confidence. Your love, guidance, and presence are the key ingredients in raising a happy and secure child. Remember, it's not about having two parents—it's about having one who truly cares.",
              image: "/images/blog-happy-child.jpg",
              author: "Jennifer Lee",
              createdAt: "2023-10-18T13:40:00Z",
              category: "Child Development",
              tags: ["confidence", "child development", "parenting"]
            }
          ];
          
          const mockBlog = mockBlogs.find(blog => blog._id === id);
          if (mockBlog) {
            setBlog(mockBlog);
          } else {
            setError('Blog post not found');
          }
        } else {
          // For MongoDB ObjectIds, we'll use the API
          const response = await blogAPI.getOne(id);
          if (response.data) {
            setBlog(response.data);
          } else {
            setError('Blog post not found');
          }
        }
      } catch (error) {
        console.error('Failed to fetch blog:', error);
        setError(error.response?.data?.message || 'Failed to load blog post. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBlog();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="blog-post-page">
        <div className="container">
          <div className="loading">Loading...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="blog-post-page">
        <div className="container">
          <div className="error-message">
            <h2>Error</h2>
            <p>{error || 'Blog post not found'}</p>
            <button onClick={() => navigate('/blogs')} className="back-button">
              Back to Blogs
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="blog-post-page">
      <article className="blog-post">
        <div className="container">
          <div className="blog-header">
            <h1>{blog.title}</h1>
            <div className="blog-meta">
              <span className="author">By {blog.author}</span>
              <span className="date">{new Date(blog.createdAt).toLocaleDateString()}</span>
              {blog.category && <span className="category">{blog.category}</span>}
            </div>
          </div>

          {blog.image && (
            <div className="blog-image">
              <img src={blog.image} alt={blog.title} />
            </div>
          )}

          <div className="blog-content">
            {blog.content}
          </div>

          {blog.tags && blog.tags.length > 0 && (
            <div className="blog-tags">
              {blog.tags.map((tag, index) => (
                <span key={index} className="tag">#{tag}</span>
              ))}
            </div>
          )}

          <div className="blog-footer">
            <button onClick={() => navigate('/blogs')} className="back-button">
              Back to Blogs
            </button>
            <div className="share-buttons">
              <button className="share-button facebook">Share on Facebook</button>
              <button className="share-button twitter">Share on Twitter</button>
              <button className="share-button whatsapp">Share on WhatsApp</button>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogPost; 