import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './DonationSuccess.css';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

const DonationSuccess = () => {
  const location = useLocation();
  const { donationId, amount } = location.state || {};

  const formatINR = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(value);
  };

  if (!donationId) {
    return (
      <div className="donation-success-page">
        <Navbar />
        <div className="container">
          <div className="error-message">
            <h2>Invalid Donation</h2>
            <p>The donation information could not be found.</p>
            <Link to="/donate" className="button">Make a New Donation</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="donation-success-page">
      <Navbar />
      
      <section className="success-hero">
        <div className="container">
          <div className="success-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1>Thank You for Your Donation!</h1>
          <p>Your contribution of {formatINR(amount)} has been received.</p>
          <p className="donation-id">Donation ID: {donationId}</p>
        </div>
      </section>

      <section className="success-content">
        <div className="container">
          <div className="next-steps">
            <h2>What's Next?</h2>
            <div className="steps-grid">
              <div className="step-card">
                <div className="step-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3>Create an Account</h3>
                <p>Track your donations and receive updates about how your contribution is making a difference.</p>
                <Link to="/signup" className="button">Sign Up</Link>
              </div>

              <div className="step-card">
                <div className="step-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 20H5C3.89543 20 3 19.1046 3 18V6C3 4.89543 3.89543 4 5 4H16L20 8V18C20 19.1046 19.1046 20 19 20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M17 4V8H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 13H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 17H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3>Download Receipt</h3>
                <p>Get a receipt for your donation for tax purposes.</p>
                <button className="button">Download Receipt</button>
              </div>

              <div className="step-card">
                <div className="step-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3>Share Your Impact</h3>
                <p>Spread the word about our cause and encourage others to donate.</p>
                <div className="social-share">
                  <button className="share-button facebook">Facebook</button>
                  <button className="share-button twitter">Twitter</button>
                  <button className="share-button whatsapp">WhatsApp</button>
                </div>
              </div>
            </div>
          </div>

          <div className="cta-section">
            <h2>Make Another Donation</h2>
            <p>Your support helps us continue our mission to support single parents.</p>
            <Link to="/donate" className="button primary">Donate Again</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DonationSuccess; 