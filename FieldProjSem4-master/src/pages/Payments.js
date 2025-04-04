import React, { useState } from 'react';
import './Payment.css';
import Navbar from '../components/hardbar/Hardbar';
import Footer from '../components/Footer/Footer';

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState('googlePay');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    bank: ''
  });

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle payment submission
    console.log('Payment submitted:', { paymentMethod, cardDetails });
    alert('Payment successful! Thank you for your donation.');
  };

  return (
    <div className="payment-page">
      <Navbar />
      
      <section className="payment-hero">
        <div className="container">
          <h1>Complete Your Donation</h1>
          <p>Support single parents with your contribution</p>
        </div>
      </section>

      <section className="payment-content">
        <div className="container">
          <form className="payment-form" onSubmit={handleSubmit}>
            <div className="payment-methods">
              <div 
                className={`method-option ${paymentMethod === 'googlePay' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('googlePay')}
              >
                <div className="method-icon">
                  <img src="/images/google-pay.png" alt="Google Pay" />
                </div>
                <span>Pay with Google Pay</span>
              </div>

              <div className="divider">
                <span>or</span>
              </div>

              <div 
                className={`method-option ${paymentMethod === 'card' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('card')}
              >
                <div className="method-icon">
                  <img src="/images/credit-card.png" alt="Credit Card" />
                </div>
                <span>Card Payment</span>
              </div>
            </div>

            {paymentMethod === 'card' && (
              <div className="card-details">
                <h3>Card Information</h3>
                
                <div className="card-types">
                  <img src="/images/visa.png" alt="VISA" />
                  <img src="/images/mastercard.png" alt="Mastercard" />
                  <img src="/images/rupay.png" alt="RuPay" />
                </div>

                <div className="form-group">
                  <label>Card Number</label>
                  <input
                    type="text"
                    name="number"
                    value={cardDetails.number}
                    onChange={handleCardChange}
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Expiry Date</label>
                    <input
                      type="text"
                      name="expiry"
                      value={cardDetails.expiry}
                      onChange={handleCardChange}
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>CVC</label>
                    <input
                      type="text"
                      name="cvc"
                      value={cardDetails.cvc}
                      onChange={handleCardChange}
                      placeholder="123"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Cardholder Name</label>
                  <input
                    type="text"
                    name="name"
                    value={cardDetails.name}
                    onChange={handleCardChange}
                    placeholder="Full name on card"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Bank Name</label>
                  <input
                    type="text"
                    name="bank"
                    value={cardDetails.bank}
                    onChange={handleCardChange}
                    placeholder="Your bank name"
                  />
                </div>
              </div>
            )}

            <div className="donation-summary">
              <h3>Donation Summary</h3>
              <div className="summary-row">
                <span>Donation Amount:</span>
                <span>₹1,000.00</span>
              </div>
              <div className="summary-row">
                <span>Payment Gateway Fee:</span>
                <span>₹18.00</span>
              </div>
              <div className="summary-row total">
                <span>Total Amount:</span>
                <span>₹1,018.00</span>
              </div>
            </div>

            <button type="submit" className="pay-button">
              Pay ₹1,018.00
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Payment;