import React from 'react';
import { useLocation } from 'react-router-dom';
import './DonationSuccess.css';
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
        <div className="container">
          <div className="error-message">
            <h2>Invalid Donation</h2>
            <p>The donation information could not be found.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="donation-success-page">
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
      <Footer />
    </div>
  );
};

export default DonationSuccess; 