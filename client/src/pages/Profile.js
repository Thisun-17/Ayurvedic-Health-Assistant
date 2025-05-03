import React, { useState } from 'react';
import '../styles/Profile.css';

function Profile() {
  const [userProfile, setUserProfile] = useState({
    name: '',
    email: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    primaryDosha: 'vata',
    doshaBalance: {
      vata: 40,
      pitta: 30,
      kapha: 30
    }
  });
  
  const [editMode, setEditMode] = useState(false);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserProfile({
      ...userProfile,
      [name]: value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would save this data to your backend
    console.log('Updated profile:', userProfile);
    setEditMode(false);
  };

  return (
    <div className="profile-page">
      <h1>My Profile</h1>
      
      <div className="profile-content">
        <div className="profile-section">
          <h2>Personal Information</h2>
          
          {editMode ? (
            <form className="profile-form" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name">Full Name</label>
                <input 
                  type="text"
                  id="name"
                  name="name"
                  value={userProfile.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label htmlFor="email">Email</label>
                <input 
                  type="email"
                  id="email"
                  name="email"
                  value={userProfile.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                />
              </div>
              
              <div>
                <label htmlFor="age">Age</label>
                <input 
                  type="number"
                  id="age"
                  name="age"
                  value={userProfile.age}
                  onChange={handleInputChange}
                  placeholder="Enter your age"
                />
              </div>
              
              <div>
                <label htmlFor="gender">Gender</label>
                <select 
                  id="gender"
                  name="gender"
                  value={userProfile.gender}
                  onChange={handleInputChange}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="height">Height (cm)</label>
                <input 
                  type="number"
                  id="height"
                  name="height"
                  value={userProfile.height}
                  onChange={handleInputChange}
                  placeholder="Enter your height in cm"
                />
              </div>
              
              <div>
                <label htmlFor="weight">Weight (kg)</label>
                <input 
                  type="number"
                  id="weight"
                  name="weight"
                  value={userProfile.weight}
                  onChange={handleInputChange}
                  placeholder="Enter your weight in kg"
                />
              </div>
              
              <button type="submit">Save Changes</button>
              <button type="button" onClick={() => setEditMode(false)}>Cancel</button>
            </form>
          ) : (
            <>
              <p><strong>Name:</strong> {userProfile.name || 'Not set'}</p>
              <p><strong>Email:</strong> {userProfile.email || 'Not set'}</p>
              <p><strong>Age:</strong> {userProfile.age || 'Not set'}</p>
              <p><strong>Gender:</strong> {userProfile.gender || 'Not set'}</p>
              <p><strong>Height:</strong> {userProfile.height ? `${userProfile.height} cm` : 'Not set'}</p>
              <p><strong>Weight:</strong> {userProfile.weight ? `${userProfile.weight} kg` : 'Not set'}</p>
              <button onClick={() => setEditMode(true)}>Edit Profile</button>
            </>
          )}
        </div>
        
        <div className="profile-section">
          <h2>Dosha Balance</h2>
          <div>
            <h3>Primary Dosha: {userProfile.primaryDosha.charAt(0).toUpperCase() + userProfile.primaryDosha.slice(1)}</h3>
            
            <div className="dosha-balance">
              <div className="dosha-type">
                <h3>Vata</h3>
                <div className="dosha-bar">
                  <div 
                    className="dosha-bar-fill vata-fill" 
                    style={{width: `${userProfile.doshaBalance.vata}%`}}
                  ></div>
                </div>
                <span>{userProfile.doshaBalance.vata}%</span>
              </div>
              
              <div className="dosha-type">
                <h3>Pitta</h3>
                <div className="dosha-bar">
                  <div 
                    className="dosha-bar-fill pitta-fill" 
                    style={{width: `${userProfile.doshaBalance.pitta}%`}}
                  ></div>
                </div>
                <span>{userProfile.doshaBalance.pitta}%</span>
              </div>
              
              <div className="dosha-type">
                <h3>Kapha</h3>
                <div className="dosha-bar">
                  <div 
                    className="dosha-bar-fill kapha-fill" 
                    style={{width: `${userProfile.doshaBalance.kapha}%`}}
                  ></div>
                </div>
                <span>{userProfile.doshaBalance.kapha}%</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="profile-section">
          <h2>Health History</h2>
          <p>Your health history and records will appear here.</p>
          <p>This section will allow you to track your health journey over time, including:</p>
          <ul>
            <li>Past health assessments</li>
            <li>Changes in dosha balance</li>
            <li>Health improvements</li>
            <li>Treatment history</li>
          </ul>
          <button>Take Health Assessment</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;