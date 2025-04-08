import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      console.log('Login attempt with:', formData);
      await login(formData);
      
      if (formData.rememberMe) {
        localStorage.setItem('rememberedEmail', formData.email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }
      
      navigate('/profile');
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message || 'Login failed. Please check your credentials and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // Implement Google login functionality
    window.location.href = `${process.env.REACT_APP_API_URL}/auth/google`;
  };

  return (
    <div className="auth-page" style={{ background: '#bf7474' }}>
      <div className="auth-center-container">
        <div className="auth-card">
          <h2>Login</h2>
          <div className="auth-tabs">
            <button onClick={() => window.location.href = '/signup'}>Sign Up</button>
            <button className="active">Login</button>
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input 
                type="email" 
                name="email"
                placeholder="Email" 
                value={formData.email}
                onChange={handleChange}
                required 
              />
            </div>
            <div className="form-group">
              <input 
                type="password" 
                name="password"
                placeholder="Password" 
                value={formData.password}
                onChange={handleChange}
                required 
              />
            </div>
            <div className="remember-forgot">
              <label className="remember-me">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                <span>Remember me</span>
              </label>
            </div>
            <button 
              type="submit" 
              className="auth-button"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <div className="auth-footer">
            <p>Don't have an account? <a href="/signup">Sign Up</a></p>
            <div className="divider">or</div>
            <button 
              className="google-auth"
              onClick={handleGoogleLogin}
              disabled={loading}
            >
              <span className="google-icon">G</span>
              Login with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;