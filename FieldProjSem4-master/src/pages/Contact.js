import React, { useState } from 'react';
import './Contact.css';
import Footer from '../components/Footer/Footer';
import TeamSection from '../components/TeamSection/TeamSection';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      
      // Reset success message after 3 seconds
      setTimeout(() => setSubmitSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="container">
          <h1>Get in Touch</h1>
          <p>We'd love to hear from you! Reach out for support, questions, or just to say hello.</p>
        </div>
      </section>

      {/* Team Section */}
      <TeamSection />

      <section className="contact-content">
        <div className="container">
          <div className="contact-grid">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <div className="input-underline"></div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <div className="input-underline"></div>
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  required
                ></textarea>
                <div className="input-underline"></div>
              </div>

              <button 
                type="submit" 
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>

              {submitSuccess && (
                <div className="success-message">
                  Message sent successfully! We'll get back to you soon.
                </div>
              )}
            </form>

            <div className="contact-info">
              <div className="info-card">
                <h3>Contact Information</h3>
                <div className="info-item">
                  <span className="icon">✉️</span>
                  <span>support@parentplus.com</span>
                </div>
                <div className="info-item">
                  <span className="icon">📞</span>
                  <span>1-800-PARENT-1</span>
                </div>
                <div className="info-item">
                  <span className="icon">💬</span>
                  <span>24/7 Chat Support</span>
                </div>
              </div>

              <div className="faq-cta">
                <h3>Frequently Asked Questions</h3>
                <p>Check our FAQ section for quick answers to common questions.</p>
                <a href="/faq" className="faq-link">Visit FAQ Page</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;