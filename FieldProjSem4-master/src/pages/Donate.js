import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { donationAPI } from '../services/api';
import './Donate.css';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

const Donate = () => {
  const [formData, setFormData] = useState({
    amount: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pinCode: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  // Pre-fill form if user is logged in
  React.useEffect(() => {
    if (isAuthenticated && user) {
      setFormData(prev => ({
        ...prev,
        email: user.email,
        firstName: user.name.split(' ')[0],
        lastName: user.name.split(' ').slice(1).join(' ') || ''
      }));
    }
  }, [isAuthenticated, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const validateForm = () => {
    if (!formData.amount || isNaN(formData.amount)) {
      setError('Please enter a valid donation amount');
      return false;
    }
    if (!formData.firstName.trim()) {
      setError('First name is required');
      return false;
    }
    if (!formData.lastName.trim()) {
      setError('Last name is required');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!formData.phone.trim()) {
      setError('Phone number is required');
      return false;
    }
    if (!formData.address.trim()) {
      setError('Address is required');
      return false;
    }
    return true;
  };

  const handleProceedToPayment = async (e) => {
    e.preventDefault();
    setError(null);
    
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      console.log('Creating donation with data:', { ...formData, amount: parseFloat(formData.amount) });
      
      // Create donation record in backend
      const donationData = {
        amount: parseFloat(formData.amount),
        donorName: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        pinCode: formData.pinCode,
        status: 'pending',
        paymentMethod: 'credit_card'
      };

      const response = await donationAPI.create(donationData);
      console.log('Donation created successfully:', response.data);
      
      // Navigate to payment page with donation ID
      navigate('/payment', {
        state: {
          donationId: response.data._id,
          amount: formData.amount
        }
      });
    } catch (error) {
      console.error('Donation creation failed:', error);
      setError(
        error.response?.data?.message || 
        error.message || 
        'Failed to process donation. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="donate-page">
      <Navbar />
      
      <section className="donate-hero">
        <div className="container">
          <h1>Support Single Parents</h1>
          <p>Your donation makes a direct impact on families in need</p>
        </div>
      </section>

      <section className="donate-content">
        <div className="container">
          <div className="donate-message">
            <h2>Make a Difference Today</h2>
            <p>
              Check out our Initiatives page and see how your Donation can make a difference. 
              Every rupee helps a Single Parent in need.
            </p>
          </div>

          {error && (
            <div className="error-message">
              <p>{error}</p>
              <button 
                className="close-error" 
                onClick={() => setError(null)}
              >
                ×
              </button>
            </div>
          )}

          <form className="donation-form" onSubmit={handleProceedToPayment}>
            <div className="form-section">
              <h3>Donation Amount *</h3>
              <div className="amount-options">
                {[25, 50, 100, 250, 500].map(amount => (
                  <button
                    type="button"
                    key={amount}
                    className={`amount-option ${formData.amount === amount.toString() ? 'selected' : ''}`}
                    onClick={() => {
                      setFormData({ ...formData, amount: amount.toString() });
                      if (error) setError(null);
                    }}
                  >
                    ₹{amount}
                  </button>
                ))}
                <div className="custom-amount">
                  <span>₹</span>
                  <input
                    type="number"
                    name="amount"
                    placeholder="Other amount"
                    value={formData.amount}
                    onChange={handleChange}
                    min="1"
                    required />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Personal Information</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required />
                </div>
                <div className="form-group">
                  <label>Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required />
                </div>
                <div className="form-group">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required />
                </div>
              </div>

              <div className="form-group">
                <label>Address *</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Pin code</label>
                  <input
                    type="text"
                    name="pinCode"
                    value={formData.pinCode}
                    onChange={handleChange} />
                </div>
              </div>
            </div>
            
            <button 
              type="submit" 
              className="donate-button"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Proceed to Payment'}
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Donate;