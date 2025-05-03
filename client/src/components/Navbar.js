import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  
  // Check authentication status on component mount and when localStorage changes
  useEffect(() => {
    const checkAuthStatus = () => {
      const userData = localStorage.getItem('userData');
      if (userData) {
        const user = JSON.parse(userData);
        if (user.isAuthenticated) {
          setIsLoggedIn(true);
          setUserName(user.firstName || 'User');
        } else {
          setIsLoggedIn(false);
          setUserName('');
        }
      } else {
        setIsLoggedIn(false);
        setUserName('');
      }
    };
    
    checkAuthStatus();
    
    // Listen for changes in localStorage
    window.addEventListener('storage', checkAuthStatus);
    
    return () => {
      window.removeEventListener('storage', checkAuthStatus);
    };
  }, []);
  
  const handleLogout = () => {
    // In a real application, you would call a logout API
    // For this demo, we just update localStorage
    const userData = localStorage.getItem('userData');
    if (userData) {
      const user = JSON.parse(userData);
      user.isAuthenticated = false;
      localStorage.setItem('userData', JSON.stringify(user));
    }
    
    setIsLoggedIn(false);
    setShowDropdown(false);
    navigate('/');
  };
  
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <h2>Ayurveda</h2>
        </Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        {isLoggedIn && (
          <>
            <li><Link to="/tracker">Health Tracker</Link></li>
            <li><Link to="/practitioners">Find Practitioners</Link></li>
          </>
        )}
      </ul>
      
      <div className="navbar-auth">
        {isLoggedIn ? (
          <div className="user-menu">
            <button className="user-menu-button" onClick={toggleDropdown}>
              <span className="user-icon">👤</span>
              <span className="user-name">{userName}</span>
              <span className="dropdown-arrow">▼</span>
            </button>
            
            {showDropdown && (
              <div className="dropdown-menu">
                <Link to="/profile" onClick={() => setShowDropdown(false)}>My Profile</Link>
                <Link to="/tracker" onClick={() => setShowDropdown(false)}>Health Tracker</Link>
                <Link to="/settings" onClick={() => setShowDropdown(false)}>Settings</Link>
                <button onClick={handleLogout}>Log Out</button>
              </div>
            )}
          </div>
        ) : (
          <div className="auth-buttons">
            <Link to="/register" className="register-btn">Register</Link>
            <Link to="/login" className="login-btn">Login</Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;