import React from 'react';

function Practitioners() {
  return (
    <div className="practitioners-page">
      <h1>Find Ayurvedic Practitioners</h1>
      <p>Connect with certified Ayurvedic health professionals in your area.</p>
      
      <div className="search-section">
        <input type="text" placeholder="Enter your location" className="location-search" />
        <button className="search-button">Search</button>
      </div>
      
      <div className="practitioners-list">
        <h2>Featured Practitioners</h2>
        <div className="practitioner-card">
          <h3>Dr. Ayush Sharma</h3>
          <p>Specializes in: Panchakarma, Digestive Health</p>
          <p>Location: Coming soon...</p>
          <button className="contact-button">Contact</button>
        </div>
        
        <div className="practitioner-card">
          <h3>Dr. Maya Patel</h3>
          <p>Specializes in: Women's Health, Stress Management</p>
          <p>Location: Coming soon...</p>
          <button className="contact-button">Contact</button>
        </div>
      </div>
    </div>
  );
}

export default Practitioners;