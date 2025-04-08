import React, { useState, useEffect } from 'react';
import { faqAPI } from '../services/api';
import './AdminFAQ.css';

const AdminFAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingFaq, setEditingFaq] = useState(null);
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      setLoading(true);
      const response = await faqAPI.getAllAdmin();
      setFaqs(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch FAQs');
      console.error('Error fetching FAQs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (faq) => {
    setEditingFaq(faq);
    setAnswer(faq.answer || '');
  };

  const handleSave = async () => {
    try {
      await faqAPI.updateFAQ(editingFaq._id, {
        answer,
        status: 'answered',
        isActive: true
      });
      setEditingFaq(null);
      fetchFAQs();
    } catch (err) {
      setError('Failed to update FAQ');
      console.error('Error updating FAQ:', err);
    }
  };

  const handleReject = async (faqId) => {
    try {
      await faqAPI.updateFAQ(faqId, {
        status: 'rejected',
        isActive: false
      });
      fetchFAQs();
    } catch (err) {
      setError('Failed to reject FAQ');
      console.error('Error rejecting FAQ:', err);
    }
  };

  if (loading) return <div className="admin-faq-loading">Loading...</div>;
  if (error) return <div className="admin-faq-error">{error}</div>;

  return (
    <div className="admin-faq-container">
      <h1>Manage FAQ Questions</h1>
      
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
      </div>

      <div className="admin-faq-list">
        {faqs.map(faq => (
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
        ))}
      </div>
    </div>
  );
};

export default AdminFAQ; 