import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Profile.css';

function Profile() {
  const navigate = useNavigate();
  
  const [userProfile, setUserProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    age: '',
    gender: '',
    dateOfBirth: '',
    height: '',
    weight: '',
    bloodType: '',
    allergies: '',
    medicalConditions: '',
    emergencyContact: '',
    emergencyPhone: '',
    primaryDosha: 'vata',
    doshaBalance: {
      vata: 40,
      pitta: 30,
      kapha: 30
    }
  });
  
  const [editMode, setEditMode] = useState(false);
  
  // Load user data from localStorage on component mount
  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const parsedData = JSON.parse(storedUserData);
      // Merge stored data with default state
      setUserProfile(prevState => ({
        ...prevState,
        ...parsedData,
        name: `${parsedData.firstName || ''} ${parsedData.lastName || ''}`.trim()
      }));
    } else {
      // If no user data, redirect to registration
      navigate('/register');
    }
  }, [navigate]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Handle nested properties for dosha balance
    if (name.startsWith('doshaBalance.')) {
      const key = name.split('.')[1];
      setUserProfile({
        ...userProfile,
        doshaBalance: {
          ...userProfile.doshaBalance,
          [key]: value
        }
      });
    } else {
      setUserProfile({
        ...userProfile,
        [name]: value
      });
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Prepare updated data
    const updatedData = {
      ...userProfile,
    };
    
    // In a real application, you would save this data to your backend
    console.log('Updated profile:', updatedData);
    
    // For demo purposes, update localStorage
    localStorage.setItem('userData', JSON.stringify(updatedData));
    
    setEditMode(false);
  };

  // Calculate age from date of birth
  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return '';
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age.toString();
  };

  return (
    <div className="profile-page">
      <h1>My Profile</h1>
      
      <div className="profile-content">
        <div className="profile-section">
          <h2>Personal Information</h2>
          
          {editMode ? (
            <form className="profile-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div>
                  <label htmlFor="firstName">First Name</label>
                  <input 
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={userProfile.firstName || ''}
                    onChange={handleInputChange}
                    placeholder="Enter your first name"
                  />
                </div>
                
                <div>
                  <label htmlFor="lastName">Last Name</label>
                  <input 
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={userProfile.lastName || ''}
                    onChange={handleInputChange}
                    placeholder="Enter your last name"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email">Email</label>
                <input 
                  type="email"
                  id="email"
                  name="email"
                  value={userProfile.email || ''}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                />
              </div>
              
              <div>
                <label htmlFor="dateOfBirth">Date of Birth</label>
                <input 
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={userProfile.dateOfBirth || ''}
                  onChange={handleInputChange}
                />
              </div>
              
              <div>
                <label htmlFor="gender">Gender</label>
                <select 
                  id="gender"
                  name="gender"
                  value={userProfile.gender || ''}
                  onChange={handleInputChange}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </div>
              
              <div className="form-row">
                <div>
                  <label htmlFor="height">Height (cm)</label>
                  <input 
                    type="number"
                    id="height"
                    name="height"
                    value={userProfile.height || ''}
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
                    value={userProfile.weight || ''}
                    onChange={handleInputChange}
                    placeholder="Enter your weight in kg"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="bloodType">Blood Type</label>
                <select 
                  id="bloodType"
                  name="bloodType"
                  value={userProfile.bloodType || ''}
                  onChange={handleInputChange}
                >
                  <option value="">Select blood type</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="allergies">Allergies</label>
                <textarea 
                  id="allergies"
                  name="allergies"
                  value={userProfile.allergies || ''}
                  onChange={handleInputChange}
                  placeholder="List any allergies you have"
                  rows="2"
                ></textarea>
              </div>
              
              <div>
                <label htmlFor="medicalConditions">Medical Conditions</label>
                <textarea 
                  id="medicalConditions"
                  name="medicalConditions"
                  value={userProfile.medicalConditions || ''}
                  onChange={handleInputChange}
                  placeholder="List any medical conditions you have"
                  rows="2"
                ></textarea>
              </div>
              
              <h3>Emergency Contact</h3>
              <div>
                <label htmlFor="emergencyContact">Name</label>
                <input 
                  type="text"
                  id="emergencyContact"
                  name="emergencyContact"
                  value={userProfile.emergencyContact || ''}
                  onChange={handleInputChange}
                  placeholder="Emergency contact name"
                />
              </div>
              
              <div>
                <label htmlFor="emergencyPhone">Phone</label>
                <input 
                  type="tel"
                  id="emergencyPhone"
                  name="emergencyPhone"
                  value={userProfile.emergencyPhone || ''}
                  onChange={handleInputChange}
                  placeholder="Emergency contact phone"
                />
              </div>
              
              <div className="form-buttons">
                <button type="submit" className="save-button">Save Changes</button>
                <button type="button" className="cancel-button" onClick={() => setEditMode(false)}>Cancel</button>
              </div>
            </form>
          ) : (
            <>
              <p><strong>Name:</strong> {userProfile.firstName ? `${userProfile.firstName} ${userProfile.lastName}` : 'Not set'}</p>
              <p><strong>Email:</strong> {userProfile.email || 'Not set'}</p>
              <p><strong>Date of Birth:</strong> {userProfile.dateOfBirth || 'Not set'}</p>
              <p><strong>Age:</strong> {userProfile.dateOfBirth ? calculateAge(userProfile.dateOfBirth) : 'Not set'}</p>
              <p><strong>Gender:</strong> {userProfile.gender === 'prefer-not-to-say' ? 'Prefer not to say' : (userProfile.gender || 'Not set')}</p>
              <p><strong>Height:</strong> {userProfile.height ? `${userProfile.height} cm` : 'Not set'}</p>
              <p><strong>Weight:</strong> {userProfile.weight ? `${userProfile.weight} kg` : 'Not set'}</p>
              <p><strong>Blood Type:</strong> {userProfile.bloodType || 'Not set'}</p>
              <p><strong>Allergies:</strong> {userProfile.allergies || 'None listed'}</p>
              <p><strong>Medical Conditions:</strong> {userProfile.medicalConditions || 'None listed'}</p>
              
              <h3>Emergency Contact</h3>
              <p><strong>Name:</strong> {userProfile.emergencyContact || 'Not set'}</p>
              <p><strong>Phone:</strong> {userProfile.emergencyPhone || 'Not set'}</p>
              
              <button onClick={() => setEditMode(true)} className="edit-button">Edit Profile</button>
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
            
            <div className="dosha-recommendations">
              <h3>Your Dosha Recommendations</h3>
              <div className="recommendation-card">
                <h4>Diet</h4>
                <p>Based on your {userProfile.primaryDosha} dominance, focus on {userProfile.primaryDosha === 'vata' ? 'warm, cooked, and nourishing foods' : userProfile.primaryDosha === 'pitta' ? 'cooling foods and avoiding spicy dishes' : 'light, warm, and dry foods'}.</p>
              </div>
              
              <div className="recommendation-card">
                <h4>Lifestyle</h4>
                <p>For {userProfile.primaryDosha} balance, try {userProfile.primaryDosha === 'vata' ? 'maintaining regular routines and getting sufficient rest' : userProfile.primaryDosha === 'pitta' ? 'cooling activities and avoiding excessive heat' : 'regular exercise and avoiding daytime naps'}.</p>
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
          <button className="assessment-button">Take Health Assessment</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;