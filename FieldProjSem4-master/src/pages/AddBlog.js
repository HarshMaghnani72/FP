import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AddBlog.css';
import Footer from '../components/Footer/Footer';

const AddBlog = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: '',
    category: 'Parenting',
    tags: []
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTagsChange = (e) => {
    const tags = e.target.value.split(',').map(tag => tag.trim());
    setFormData(prev => ({
      ...prev,
      tags
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    try {
      const response = await fetch('http://localhost:5000/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          ...formData,
          author: user.name,
          status: 'published'
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create blog post');
      }

      setSuccess(true);
      setTimeout(() => {
        navigate('/blogs');
      }, 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  if (!user || user.role !== 'admin') {
    return (
      <div className="add-blog-page">
        <div className="container">
          <div className="error-message">
            <h2>Access Denied</h2>
            <p>You do not have permission to access this page.</p>
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
    <div className="add-blog-page">
      <section className="add-blog-hero">
        <div className="container">
          <h1>Add New Blog Post</h1>
          <p>Share your knowledge and experience with our community</p>
        </div>
      </section>

      <section className="add-blog-content">
        <div className="container">
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">Blog post created successfully!</div>}
          
          <form onSubmit={handleSubmit} className="add-blog-form">
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="content">Content</label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
                rows="10"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="image">Image URL</label>
              <input
                type="text"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="/images/blog-image.jpg"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="Parenting">Parenting</option>
                <option value="Health">Health</option>
                <option value="Education">Education</option>
                <option value="Finance">Finance</option>
                <option value="Work-Life Balance">Work-Life Balance</option>
                <option value="Wellness">Wellness</option>
                <option value="Child Development">Child Development</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="tags">Tags (comma separated)</label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags.join(', ')}
                onChange={handleTagsChange}
                placeholder="single parent, parenting tips, work-life balance"
              />
            </div>
            
            <div className="form-actions">
              <button type="button" onClick={() => navigate('/blogs')} className="cancel-button">
                Cancel
              </button>
              <button type="submit" className="submit-button">
                Publish Blog
              </button>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AddBlog; 