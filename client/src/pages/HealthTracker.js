import React, { useState, useEffect } from 'react';
import '../styles/HealthTracker.css';
import Calendar from '../components/tracker/Calendar';
import MoodTracker from '../components/tracker/MoodTracker';
import DoshaBalanceTracker from '../components/tracker/DoshaBalanceTracker';
import AyurvedicDietTracker from '../components/tracker/AyurvedicDietTracker';

function HealthTracker() {
  const [date, setDate] = useState(new Date());
  const [selectedMood, setSelectedMood] = useState(null);
  const [activeTab, setActiveTab] = useState('wellness');
  const [userData, setUserData] = useState(null);
  
  const [dailyLog, setDailyLog] = useState({
    sleepHours: '',
    sleepQuality: '',
    digestion: '',
    energy: '',
    stress: '',
    notes: '',
  });
  
  const [dietLog, setDietLog] = useState({
    breakfast: '',
    lunch: '',
    dinner: '',
    snacks: '',
    water: '',
    warmWater: false,
    herbalTea: false,
    herbs: '',
    hungerLevel: '',
    digestionQuality: '',
    notes: '',
  });

  useEffect(() => {
    // Load user data from localStorage or API
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
    
    // Load saved logs for the selected date
    loadDailyLogs();
  }, [date]);
  
  const loadDailyLogs = () => {
    // In a real app, this would load data from an API or local storage
    // based on the selected date
    
    // Reset the form data when date changes
    setSelectedMood(null);
    setDailyLog({
      sleepHours: '',
      sleepQuality: '',
      digestion: '',
      energy: '',
      stress: '',
      notes: '',
    });
    
    setDietLog({
      breakfast: '',
      lunch: '',
      dinner: '',
      snacks: '',
      water: '',
      warmWater: false,
      herbalTea: false,
      herbs: '',
      hungerLevel: '',
      digestionQuality: '',
      notes: '',
    });
    
    // Here you would fetch logs for the given date
    // For demo purposes, we'll use mock data occasionally
    const dateStr = date.toISOString().split('T')[0];
    if (dateStr === new Date().toISOString().split('T')[0]) {
      // Today - empty form
    } else if (Math.random() > 0.7) {
      // Random past date with data - just a simulation
      setSelectedMood(['great', 'good', 'neutral', 'tired', 'unwell'][Math.floor(Math.random() * 5)]);
      
      setDailyLog({
        sleepHours: Math.floor(Math.random() * 4) + 5,
        sleepQuality: ['excellent', 'good', 'fair', 'poor'][Math.floor(Math.random() * 4)],
        digestion: ['excellent', 'good', 'fair', 'poor'][Math.floor(Math.random() * 4)],
        energy: ['high', 'moderate', 'low'][Math.floor(Math.random() * 3)],
        stress: ['none', 'mild', 'moderate', 'high'][Math.floor(Math.random() * 4)],
        notes: '',
      });
    }
  };
  
  const handleLogChange = (e) => {
    const { name, value } = e.target;
    setDailyLog({
      ...dailyLog,
      [name]: value
    });
  };
  
  const handleDietChange = (e) => {
    const { name, value } = e.target;
    setDietLog({
      ...dietLog,
      [name]: value
    });
  };
  
  const submitDailyLog = (e) => {
    e.preventDefault();
    // In a real application, this would be saved to a backend
    console.log('Daily log:', {
      date: date.toDateString(),
      mood: selectedMood,
      ...dailyLog
    });
    
    // Save to localStorage for demo
    const logs = JSON.parse(localStorage.getItem('healthLogs') || '{}');
    const dateStr = date.toISOString().split('T')[0];
    
    logs[dateStr] = {
      ...logs[dateStr],
      dailyLog: {
        date: date.toDateString(),
        mood: selectedMood,
        ...dailyLog
      }
    };
    
    localStorage.setItem('healthLogs', JSON.stringify(logs));
    
    // Show confirmation
    alert('Daily wellness log saved successfully!');
  };
  
  const submitDietLog = (e) => {
    e.preventDefault();
    // In a real application, this would be saved to a backend
    console.log('Diet log:', {
      date: date.toDateString(),
      ...dietLog
    });
    
    // Save to localStorage for demo
    const logs = JSON.parse(localStorage.getItem('healthLogs') || '{}');
    const dateStr = date.toISOString().split('T')[0];
    
    logs[dateStr] = {
      ...logs[dateStr],
      dietLog: {
        date: date.toDateString(),
        ...dietLog
      }
    };
    
    localStorage.setItem('healthLogs', JSON.stringify(logs));
    
    // Show confirmation
    alert('Diet log saved successfully!');
  };
  
  // Mock data for balance indicators
  const balanceData = {
    vata: Math.random() > 0.5 ? 'balanced' : 'increased',
    pitta: Math.random() > 0.5 ? 'balanced' : 'decreased',
    kapha: Math.random() > 0.5 ? 'balanced' : 'increased',
  };
  
  // Mock recommendations based on dosha balance
  const getRecommendations = () => {
    if (balanceData.vata === 'increased') {
      return [
        { title: 'Diet', content: 'Focus on warm, cooked foods. Favor sweet, sour and salty tastes.' },
        { title: 'Lifestyle', content: 'Maintain regular routines. Get sufficient rest and practice meditation.' },
        { title: 'Hydration', content: 'Drink warm water throughout the day. Avoid cold beverages.' }
      ];
    } else if (balanceData.pitta === 'increased') {
      return [
        { title: 'Diet', content: 'Favor cooling foods. Reduce spicy, oily and fermented foods.' },
        { title: 'Lifestyle', content: 'Avoid excessive heat. Practice cooling exercises and meditation.' },
        { title: 'Hydration', content: 'Stay well hydrated with room temperature water. Try cooling herbal teas.' }
      ];
    } else {
      return [
        { title: 'Diet', content: 'Focus on light, warm foods. Reduce heavy, oily and sweet foods.' },
        { title: 'Lifestyle', content: 'Increase physical activity. Practice stimulating yoga and breathing exercises.' },
        { title: 'Hydration', content: 'Drink warm water with ginger or herbal teas like cinnamon and clove.' }
      ];
    }
  };

  const renderTabContent = () => {
    switch(activeTab) {
      case 'wellness':
        return (
          <div className="tab-content">
            <form className="tracker-form" onSubmit={submitDailyLog}>
              <MoodTracker 
                selectedMood={selectedMood} 
                setSelectedMood={setSelectedMood} 
              />
              
              <h3>Daily Wellness Metrics</h3>
              
              <div className="form-group">
                <label htmlFor="sleepHours">Hours of Sleep</label>
                <input 
                  type="number" 
                  id="sleepHours" 
                  name="sleepHours" 
                  value={dailyLog.sleepHours} 
                  onChange={handleLogChange} 
                  step="0.5"
                  min="0"
                  placeholder="Enter hours"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="sleepQuality">Sleep Quality</label>
                <select 
                  id="sleepQuality" 
                  name="sleepQuality" 
                  value={dailyLog.sleepQuality} 
                  onChange={handleLogChange}
                >
                  <option value="">Select quality</option>
                  <option value="excellent">Excellent</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                  <option value="poor">Poor</option>
                  <option value="terrible">Terrible</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="digestion">Digestion</label>
                <select 
                  id="digestion" 
                  name="digestion" 
                  value={dailyLog.digestion} 
                  onChange={handleLogChange}
                >
                  <option value="">Select status</option>
                  <option value="excellent">Excellent</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                  <option value="poor">Poor</option>
                  <option value="terrible">Terrible</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="energy">Energy Level</label>
                <select 
                  id="energy" 
                  name="energy" 
                  value={dailyLog.energy} 
                  onChange={handleLogChange}
                >
                  <option value="">Select level</option>
                  <option value="high">High</option>
                  <option value="moderate">Moderate</option>
                  <option value="low">Low</option>
                  <option value="very-low">Very Low</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="stress">Stress Level</label>
                <select 
                  id="stress" 
                  name="stress" 
                  value={dailyLog.stress} 
                  onChange={handleLogChange}
                >
                  <option value="">Select level</option>
                  <option value="none">None</option>
                  <option value="mild">Mild</option>
                  <option value="moderate">Moderate</option>
                  <option value="high">High</option>
                  <option value="severe">Severe</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="notes">Notes</label>
                <textarea 
                  id="notes" 
                  name="notes" 
                  value={dailyLog.notes} 
                  onChange={handleLogChange}
                  placeholder="Any additional observations or symptoms..."
                  rows="3"
                ></textarea>
              </div>
              
              <button type="submit" className="submit-button">Save Daily Log</button>
            </form>
          </div>
        );
        
      case 'diet':
        return (
          <div className="tab-content">
            <AyurvedicDietTracker 
              dietLog={dietLog}
              handleDietChange={handleDietChange}
              submitDietLog={submitDietLog}
              primaryDosha={userData?.primaryDosha || 'vata'}
            />
          </div>
        );
        
      case 'balance':
        return (
          <div className="tab-content">
            <DoshaBalanceTracker 
              balanceData={balanceData}
              recommendations={getRecommendations()}
            />
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="health-tracker-page">
      <h1>Health Tracker</h1>
      <p className="tracker-description">Track your daily health metrics and habits according to Ayurvedic principles.</p>
      
      <div className="tracker-container">
        <div className="tracker-sidebar">
          <div className="sidebar-section">
            <h2>Select Date</h2>
            <Calendar date={date} setDate={setDate} />
            <p className="selected-date"><strong>Selected:</strong> {date.toDateString()}</p>
          </div>
          
          <div className="sidebar-section stats-summary">
            <h2>Stats Summary</h2>
            <div className="stats-item">
              <span className="stats-label">Logs This Month:</span>
              <span className="stats-value">12</span>
            </div>
            <div className="stats-item">
              <span className="stats-label">Streak:</span>
              <span className="stats-value">5 days</span>
            </div>
            <div className="stats-item">
              <span className="stats-label">Most Common Mood:</span>
              <span className="stats-value">Good 🙂</span>
            </div>
            
            <button className="view-insights-button">View Insights</button>
          </div>
        </div>
        
        <div className="tracker-main">
          <div className="tracker-tabs">
            <button 
              className={`tab-button ${activeTab === 'wellness' ? 'active' : ''}`} 
              onClick={() => setActiveTab('wellness')}
            >
              Wellness Log
            </button>
            <button 
              className={`tab-button ${activeTab === 'diet' ? 'active' : ''}`} 
              onClick={() => setActiveTab('diet')}
            >
              Diet Tracker
            </button>
            <button 
              className={`tab-button ${activeTab === 'balance' ? 'active' : ''}`} 
              onClick={() => setActiveTab('balance')}
            >
              Dosha Balance
            </button>
          </div>
          
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}

export default HealthTracker;