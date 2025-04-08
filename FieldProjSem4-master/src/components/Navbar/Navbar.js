import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';
import logo from './logo.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="logo">
          <img src={logo} alt="ParentPlus Logo" className="logo-img" />
          <Link to="/"><span>ParentPlus</span></Link>
        </div>
        <div className="nav-links">
          <Link to="/about">About</Link>
          <Link to="/blogs">Blogs</Link>
          <Link to="/contact">Contact Us</Link>
          <Link to="/faq">FAQ</Link>
          {!isAuthenticated ? (
            <>
              <Link to="/signup">Signup</Link>
              <Link to="/donate" className="cta-button">Donate</Link>
            </>
          ) : (
            <>
              <Link to="/donate" className="cta-button">Donate</Link>
              <div className="profile-dropdown">
                <button 
                  className="profile-button"
                  onClick={toggleProfile}
                >
                  {user?.name?.split(' ')[0] || 'Profile'}
                </button>
                {isProfileOpen && (
                  <div className="dropdown-menu">
                    <Link to="/profile" onClick={() => setIsProfileOpen(false)}>
                      My Profile
                    </Link>
                    {user?.role === 'admin' && (
                      <>
                        <Link to="/admin" onClick={() => setIsProfileOpen(false)}>
                          Admin Dashboard
                        </Link>
                        <Link to="/admin/faq" onClick={() => setIsProfileOpen(false)}>
                          Manage FAQs
                        </Link>
                      </>
                    )}
                    <button onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;