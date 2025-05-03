import React from 'react';

function HealthTracker() {
  return (
    <div className="health-tracker-page">
      <h1>Health Tracker</h1>
      <p>Track your daily health metrics and habits according to Ayurvedic principles.</p>
      
      <div className="tracker-sections">
        <div className="tracker-section">
          <h2>Daily Wellness Log</h2>
          <p>Coming soon: Track sleep, digestion, energy levels, and more...</p>
        </div>
        
        <div className="tracker-section">
          <h2>Diet Tracker</h2>
          <p>Coming soon: Log your meals and get recommendations based on your dosha...</p>
        </div>
        
        <div className="tracker-section">
          <h2>Balance Indicators</h2>
          <p>Coming soon: Visual representation of your dosha balance over time...</p>
        </div>
      </div>
    </div>
  );
}

export default HealthTracker;