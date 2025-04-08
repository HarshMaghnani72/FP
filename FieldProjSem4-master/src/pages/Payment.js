import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { donationAPI } from '../services/api';
import './Payment.css';
import Footer from '../components/Footer/Footer';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [donation, setDonation] = useState(null);
  
  const donationId = location.state?.donationId;
  const amount = location.state?.amount || '0';

  useEffect(() => {
    const fetchDonation = async () => {
      if (!donationId) {
        navigate('/donate');
        return;
      }

      try {
        const response = await donationAPI.getOne(donationId);
        setDonation(response.data);
      } catch (error) {
        console.error('Failed to fetch donation:', error);
        setError('Failed to load donation details. Please try again.');
      }
    };

    fetchDonation();
  }, [donationId, navigate]);

  const [paymentMethod, setPaymentMethod] = useState('googlePay');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: donation?.donorName || ''
  });

  // Calculate total (1.8% gateway fee)
  const donationAmount = Number(amount) || 0;
  const fee = Math.round(donationAmount * 0.018);
  const total = donationAmount + fee;

  const formatINR = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(value);
  };

  const handlePayment = async () => {
    if (!donationId) {
      setError('Invalid donation. Please try again.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // In a real application, this would integrate with a payment gateway
      // For now, we'll simulate a successful payment
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Update donation status to completed
      await donationAPI.update(donationId, {
        status: 'completed',
        paymentMethod,
        paymentDetails: paymentMethod === 'card' ? {
          last4: cardDetails.number.slice(-4),
          cardType: 'visa', // This would be determined by the card number in a real app
        } : {
          method: 'googlePay'
        }
      });

      // Navigate to success page
      navigate('/donation-success', {
        state: {
          donationId,
          amount: total
        }
      });
    } catch (error) {
      console.error('Payment failed:', error);
      setError(error.response?.data?.message || 'Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!donation) {
    return (
      <div className="payment-page">
        <div className="container">
          <div className="loading-message">Loading donation details...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="payment-page">
      <section className="payment-hero">
        <div className="container">
          <h1>Complete Your Donation</h1>
          <p>Donating as: {donation.donorName} ({donation.email})</p>
        </div>
      </section>

      <section className="payment-content">
        <div className="container">
          {error && <div className="error-message">{error}</div>}

          {/* Payment Options */}
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

            <div className="divider">or</div>

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
              
              <div className="form-group">
                <label>Card Number</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={cardDetails.number}
                  onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Expiry Date</label>
                  <input 
                    type="text" 
                    placeholder="MM/YY" 
                    value={cardDetails.expiry}
                    onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>CVC</label>
                  <input 
                    type="text" 
                    placeholder="123" 
                    value={cardDetails.cvc}
                    onChange={(e) => setCardDetails({...cardDetails, cvc: e.target.value})}
                    required 
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Cardholder Name</label>
                <input
                  type="text"
                  value={cardDetails.name}
                  onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
                  required
                />
              </div>
            </div>
          )}

          <div className="donation-summary">
            <h3>Donation Summary</h3>
            <div className="summary-row">
              <span>Amount:</span>
              <span>{formatINR(donationAmount)}</span>
            </div>
            <div className="summary-row">
              <span>Gateway Fee:</span>
              <span>{formatINR(fee)}</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>{formatINR(total)}</span>
            </div>
          </div>

          <button 
            className="pay-button"
            onClick={handlePayment}
            disabled={loading}
          >
            {loading ? 'Processing Payment...' : `Pay ${formatINR(total)}`}
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Payment;