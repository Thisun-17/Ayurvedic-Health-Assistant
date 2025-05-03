import React from 'react';

function Home() {
  return (
    <div className="home-page">
      <h1>Welcome to Your Ayurvedic Health Assistant</h1>
      <p>Discover personalized wellness based on ancient wisdom</p>
      
      <div className="features-section">
        <div className="feature">
          <h3>Discover Your Dosha</h3>
          <p>Learn about your unique mind-body constitution</p>
        </div>
        <div className="feature">
          <h3>Daily Recommendations</h3>
          <p>Get personalized diet, exercise, and lifestyle tips</p>
        </div>
        <div className="feature">
          <h3>Track Your Balance</h3>
          <p>Monitor your health patterns over time</p>
        </div>
      </div>
    </div>
  );
}

export default Home;