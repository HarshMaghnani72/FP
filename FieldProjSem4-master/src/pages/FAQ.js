import React, { useState } from 'react';
import './FAQ.css';
import Footer from '../components/Footer/Footer';
import { useAuth } from '../context/AuthContext';
import { faqAPI } from '../services/api';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [newQuestion, setNewQuestion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const { isAuthenticated } = useAuth();

  const faqItems = [
    {
      question: "How do I create an account?",
      answer: "Click on the 'Sign Up' button in the top navigation and fill out the registration form with your details."
    },
    {
      question: "How can I make a donation?",
      answer: "Navigate to the 'Donate' page, enter your donation amount and details, then proceed to payment."
    },
    {
      question: "Where can I find parenting resources?",
      answer: "All our resources are available in the 'Resources' section, categorized for easy access."
    },
    {
      question: "How do I contact support?",
      answer: "You can email us at support@parentplus.com, call our helpline, or use the 24/7 chat support."
    },
    {
      question: "Is my personal information secure?",
      answer: "Yes, we use industry-standard encryption to protect all your personal and payment information."
    }
  ];

  const toggleQuestion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleSubmitQuestion = async (e) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;

    setIsSubmitting(true);
    try {
      await faqAPI.create({ question: newQuestion });
      setNewQuestion('');
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to submit question:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredFaqs = faqItems.filter(item =>
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchTerm.toLowerCase())
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

          <div className="faq-list">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((item, index) => (
                <div key={index} className="faq-item">
                  <div 
                    className="faq-question"
                    onClick={() => toggleQuestion(index)}
                  >
                    <h3>{item.question}</h3>
                    <span className="toggle-icon">
                      {activeIndex === index ? '−' : '+'}
                    </span>
                  </div>
                  {activeIndex === index && (
                    <div className="faq-answer">
                      <p>{item.answer}</p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="no-results">No results found for your search.</p>
            )}
          </div>

          {isAuthenticated && (
            <div className="ask-question-section">
              <h3>Still have a question?</h3>
              <form onSubmit={handleSubmitQuestion} className="question-form">
                <textarea
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  placeholder="Type your question here..."
                  required
                />
                <button 
                  type="submit" 
                  className="submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Question'}
                </button>
                {submitSuccess && (
                  <div className="success-message">
                    Your question has been submitted successfully!
                  </div>
                )}
              </form>
            </div>
          )}

          <div className="feedback-section">
            <h3>Did you find what you were looking for?</h3>
            <div className="feedback-buttons">
              <button className="feedback-btn yes">Yes</button>
              <button className="feedback-btn no">No</button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQ;