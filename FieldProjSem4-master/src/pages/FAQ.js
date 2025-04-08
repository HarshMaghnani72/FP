import React, { useState } from 'react';
import './FAQ.css';
import Footer from '../components/Footer/Footer';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [newQuestion, setNewQuestion] = useState('');
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newQuestion.trim()) {
      // Here you would typically make an API call to submit the question
      console.log('Submitting question:', newQuestion);
      setNewQuestion('');
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
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
              filteredFaqs.map((faq, index) => (
                <div key={index} className="faq-item">
                  <div 
                    className="faq-question"
                    onClick={() => toggleQuestion(index)}
                  >
                    <h3>{faq.question}</h3>
                    <span className="toggle-icon">
                      {activeIndex === index ? '−' : '+'}
                    </span>
                  </div>
                  {activeIndex === index && (
                    <div className="faq-answer">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="no-results">
                No results found for your search
              </div>
            )}
          </div>

          <div className="submit-question-section">
            <h3>Still have a question?</h3>
            <form onSubmit={handleSubmit} className="submit-form">
              <textarea
                placeholder="Type your question here..."
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                required
              />
              <button type="submit" className="submit-btn">
                Submit Question
              </button>
            </form>
            {submitted && (
              <div className="success-message">
                Thank you! Your question has been submitted.
              </div>
            )}
          </div>

          <div className="feedback-section">
            <h3>Was this helpful?</h3>
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