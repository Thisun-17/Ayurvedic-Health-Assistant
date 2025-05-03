import React from 'react';
import '../styles/Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h2>Ayurveda</h2>
      </div>
      <ul className="navbar-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#profile">My Profile</a></li>
        <li><a href="#tracker">Health Tracker</a></li>
        <li><a href="#practitioners">Find Practitioners</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;