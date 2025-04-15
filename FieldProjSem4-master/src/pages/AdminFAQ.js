import React, { useState, useEffect } from 'react';
import { faqAPI } from '../services/api';
import './AdminFAQ.css';

const AdminFAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingFaq, setEditingFaq] = useState(null);
  const [answer, setAnswer] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'pending', 'answered', 'rejected'

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await faqAPI.getAllAdmin();
      console.log('Fetched FAQs:', response.data);
      setFaqs(response.data);
    } catch (err) {
      console.error('Error fetching FAQs:', err);
      setError('Failed to fetch FAQs. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (faq) => {
    setEditingFaq(faq);
    setAnswer(faq.answer || '');
    setSuccessMessage('');
  };

  const handleSave = async () => {
    if (!editingFaq || !answer.trim()) return;

    try {
      setError(null);
      await faqAPI.updateFAQ(editingFaq._id, {
        answer,
        status: 'answered',
        isActive: true
      });
      setEditingFaq(null);
      setAnswer('');
      setSuccessMessage('FAQ updated successfully!');
      fetchFAQs();
    } catch (err) {
      console.error('Error updating FAQ:', err);
      setError('Failed to update FAQ. Please try again.');
    }
  };

  const handleReject = async (faqId) => {
    try {
      setError(null);
      await faqAPI.updateFAQ(faqId, {
        status: 'rejected',
        isActive: false
      });
      setSuccessMessage('FAQ rejected successfully!');
      fetchFAQs();
    } catch (err) {
      console.error('Error rejecting FAQ:', err);
      setError('Failed to reject FAQ. Please try again.');
    }
  };

  const filteredFaqs = faqs.filter(faq => {
    if (filter === 'all') return true;
    return faq.status === filter;
  });

  if (loading) {
    return (
      <div className="admin-faq-container">
        <div className="loading-spinner">Loading FAQs...</div>
      </div>
    );
  }

  return (
    <div className="admin-faq-container">
      <h1>Manage FAQ Questions</h1>
      
      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
      
      <div className="admin-faq-stats">
        <div className="stat-item">
          <span className="stat-label">Total Questions:</span>
          <span className="stat-value">{faqs.length}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Pending:</span>
          <span className="stat-value">
            {faqs.filter(faq => faq.status === 'pending').length}
          </span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Answered:</span>
          <span className="stat-value">
            {faqs.filter(faq => faq.status === 'answered').length}
          </span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Rejected:</span>
          <span className="stat-value">
            {faqs.filter(faq => faq.status === 'rejected').length}
          </span>
        </div>
      </div>

      <div className="filter-controls">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All Questions
        </button>
        <button 
          className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
          onClick={() => setFilter('pending')}
        >
          Pending
        </button>
        <button 
          className={`filter-btn ${filter === 'answered' ? 'active' : ''}`}
          onClick={() => setFilter('answered')}
        >
          Answered
        </button>
        <button 
          className={`filter-btn ${filter === 'rejected' ? 'active' : ''}`}
          onClick={() => setFilter('rejected')}
        >
          Rejected
        </button>
      </div>

      <div className="admin-faq-list">
        {filteredFaqs.length === 0 ? (
          <div className="no-faqs">No FAQ questions found.</div>
        ) : (
          filteredFaqs.map(faq => (
            <div key={faq._id} className="admin-faq-item">
              <div className="faq-header">
                <h3>{faq.question}</h3>
                <span className={`status-badge ${faq.status}`}>
                  {faq.status}
                </span>
              </div>
              
              <div className="faq-details">
                <p><strong>Category:</strong> {faq.category}</p>
                <p><strong>Submitted:</strong> {new Date(faq.createdAt).toLocaleDateString()}</p>
              </div>

              {editingFaq?._id === faq._id ? (
                <div className="faq-edit-form">
                  <textarea
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Enter your answer..."
                    rows={4}
                  />
                  <div className="edit-actions">
                    <button onClick={handleSave} className="save-btn">
                      Save Answer
                    </button>
                    <button 
                      onClick={() => setEditingFaq(null)} 
                      className="cancel-btn"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="faq-actions">
                  {faq.status === 'pending' && (
                    <>
                      <button 
                        onClick={() => handleEdit(faq)}
                        className="answer-btn"
                      >
                        Answer Question
                      </button>
                      <button 
                        onClick={() => handleReject(faq._id)}
                        className="reject-btn"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {faq.answer && (
                    <div className="faq-answer">
                      <strong>Answer:</strong>
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminFAQ; 