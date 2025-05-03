import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h2>Ayurveda</h2>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/profile">My Profile</Link></li>
        <li><Link to="/tracker">Health Tracker</Link></li>
        <li><Link to="/practitioners">Find Practitioners</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;