import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { faqAPI } from '../services/api';
import './AdminDashboard.css';
import Footer from '../components/Footer/Footer';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingFaq, setEditingFaq] = useState(null);
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    try {
      setLoading(true);
      const response = await faqAPI.getAllAdmin();
      setFaqs(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
      setError('Failed to load FAQs. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (faq) => {
    setEditingFaq(faq);
    setAnswer(faq.answer || '');
  };

  const handleSave = async () => {
    if (!editingFaq || !answer.trim()) return;

    try {
      await faqAPI.update(editingFaq._id, {
        answer,
        status: 'answered',
        isActive: true
      });
      
      // Refresh the FAQ list
      fetchFaqs();
      
      // Reset editing state
      setEditingFaq(null);
      setAnswer('');
    } catch (error) {
      console.error('Error updating FAQ:', error);
      alert('Failed to update FAQ. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this FAQ?')) return;

    try {
      await faqAPI.delete(id);
      fetchFaqs();
    } catch (error) {
      console.error('Error deleting FAQ:', error);
      alert('Failed to delete FAQ. Please try again.');
    }
  };

  if (!user || user.role !== 'admin') {
    return (
      <div className="admin-dashboard">
        <div className="container">
          <h1>Access Denied</h1>
          <p>You do not have permission to view this page.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <section className="admin-hero">
        <div className="container">
          <h1>Admin Dashboard</h1>
          <p>Manage FAQ questions and answers</p>
        </div>
      </section>

      <section className="admin-content">
        <div className="container">
          {error && <div className="error-message">{error}</div>}
          
          {loading ? (
            <div className="loading-message">Loading FAQs...</div>
          ) : (
            <div className="faq-management">
              <h2>FAQ Management</h2>
              
              <div className="faq-list">
                {faqs.length === 0 ? (
                  <p className="no-faqs">No FAQs found.</p>
                ) : (
                  faqs.map(faq => (
                    <div key={faq._id} className="faq-item">
                      <div className="faq-header">
                        <h3>{faq.question}</h3>
                        <div className="faq-status">
                          <span className={`status-badge ${faq.status}`}>
                            {faq.status}
                          </span>
                        </div>
                      </div>
                      
                      {editingFaq && editingFaq._id === faq._id ? (
                        <div className="edit-form">
                          <textarea
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            placeholder="Enter answer here..."
                            rows="4"
                          />
                          <div className="edit-actions">
                            <button 
                              className="save-btn"
                              onClick={handleSave}
                              disabled={!answer.trim()}
                            >
                              Save Answer
                            </button>
                            <button 
                              className="cancel-btn"
                              onClick={() => {
                                setEditingFaq(null);
                                setAnswer('');
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="faq-content">
                          <p className="answer">
                            {faq.answer || <em>No answer yet</em>}
                          </p>
                          
                          <div className="faq-actions">
                            {!faq.answer && (
                              <button 
                                className="edit-btn"
                                onClick={() => handleEdit(faq)}
                              >
                                Add Answer
                              </button>
                            )}
                            <button 
                              className="delete-btn"
                              onClick={() => handleDelete(faq._id)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AdminDashboard; 