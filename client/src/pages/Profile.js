import React from 'react';

function Profile() {
  return (
    <div className="profile-page">
      <h1>My Profile</h1>
      <p>This is the profile page. User profile information will be displayed here.</p>
      <div className="profile-content">
        <div className="profile-section">
          <h2>Personal Information</h2>
          <p>Coming soon...</p>
        </div>
        <div className="profile-section">
          <h2>Health History</h2>
          <p>Coming soon...</p>
        </div>
        <div className="profile-section">
          <h2>Dosha Balance</h2>
          <p>Coming soon...</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;