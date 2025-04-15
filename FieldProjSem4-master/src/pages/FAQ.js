import React, { useState, useEffect } from 'react';
import { faqAPI } from '../services/api';
import './FAQ.css';
import Footer from '../components/Footer/Footer';

const FAQ = () => {
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [newQuestion, setNewQuestion] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userQuestions, setUserQuestions] = useState([]);
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    fetchFAQs();
    fetchUserQuestions();
  }, []);

  const fetchFAQs = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await faqAPI.getAll();
      if (response.data) {
        setFaqs(response.data);
      } else {
        setError('No FAQs found');
      }
    } catch (err) {
      setError('Failed to load FAQs. Please try again later.');
      console.error('Error fetching FAQs:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserQuestions = async () => {
    try {
      const response = await faqAPI.getByCategory('user-submitted');
      if (response.data) {
        setUserQuestions(response.data);
      }
    } catch (err) {
      console.error('Error fetching user questions:', err);
    }
  };

  const toggleQuestion = (index) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newQuestion.trim()) {
      setSubmitError('Please enter a question');
      return;
    }

    try {
      setSubmitError(null);
      const response = await faqAPI.submit({ question: newQuestion.trim() });
      if (response.status === 201) {
        setNewQuestion('');
        setSuccessMessage('Your question has been submitted successfully! Our team will review it and provide an answer soon.');
        setTimeout(() => setSuccessMessage(''), 5000);
        fetchUserQuestions();
      } else {
        setSubmitError('Failed to submit question. Please try again.');
      }
    } catch (err) {
      console.error('Error submitting question:', err);
      setSubmitError(err.response?.data?.message || 'Failed to submit question. Please try again later.');
    }
  };

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (faq.answer && faq.answer.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="faq-page">
      <section className="faq-hero">
        <div className="container">
          <h1>Frequently Asked Questions</h1>
          <p>Find answers to common questions about ParentPlus</p>
        </div>
      </section>

      <section className="faq-content">
        <div className="container">
          <div className="search-box">
            <input
              type="text"
              placeholder="Type keywords to find answers"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="search-icon">🔍</span>
          </div>

          {loading ? (
            <div className="loading">Loading FAQs...</div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : (
            <>
              <div className="faq-list">
                {filteredFaqs.length > 0 ? (
                  filteredFaqs.map((faq, index) => (
                    <div key={faq._id} className="faq-item">
                      <div
                        className="faq-question"
                        onClick={() => toggleQuestion(index)}
                      >
                        <h3>{faq.question}</h3>
                        <span className="toggle-icon">
                          {activeQuestion === index ? '−' : '+'}
                        </span>
                      </div>
                      {activeQuestion === index && (
                        <div className="faq-answer">
                          <p>{faq.answer || 'No answer available yet.'}</p>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="no-results">No results found for your search.</p>
                )}
              </div>

              <div className="submit-section">
                <h3>Still have a question?</h3>
                <form onSubmit={handleSubmit} className="submit-form">
                  <textarea
                    placeholder="Type your question here..."
                    value={newQuestion}
                    onChange={(e) => {
                      setNewQuestion(e.target.value);
                      setSubmitError(null);
                    }}
                    required
                  />
                  {submitError && <div className="error-message">{submitError}</div>}
                  <button type="submit" className="submit-btn">
                    Submit Question
                  </button>
                </form>
                {successMessage && <div className="success-message">{successMessage}</div>}
              </div>

              <div className="feedback-section">
                <h3>Did you find what you were looking for?</h3>
                <div className="feedback-buttons">
                  <button className="feedback-btn yes">Yes</button>
                  <button className="feedback-btn no">No</button>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default FAQ;