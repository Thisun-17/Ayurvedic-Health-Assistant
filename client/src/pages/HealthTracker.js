import React, { useState } from 'react';
import '../styles/HealthTracker.css';

function HealthTracker() {
  const [date, setDate] = useState(new Date());
  const [selectedMood, setSelectedMood] = useState(null);
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
  });
  
  // Generate calendar days for the month view
  const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  
  const calendarDays = [];
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
  }
  
  // Add cells for each day of the month
  for (let i = 1; i <= daysInMonth; i++) {
    const currentDate = new Date(date.getFullYear(), date.getMonth(), i);
    const today = new Date();
    const isToday = 
      currentDate.getDate() === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear();
      
    calendarDays.push(
      <div 
        key={`day-${i}`} 
        className={`calendar-day ${isToday ? 'active' : ''}`}
        onClick={() => setDate(new Date(date.getFullYear(), date.getMonth(), i))}
      >
        {i}
      </div>
    );
  }
  
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
  
  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
  };
  
  const submitDailyLog = (e) => {
    e.preventDefault();
    // In a real application, this would be saved to a backend
    console.log('Daily log:', {
      date: date.toDateString(),
      mood: selectedMood,
      ...dailyLog
    });
    
    // Reset form or show confirmation
    alert('Daily wellness log saved successfully!');
  };
  
  const submitDietLog = (e) => {
    e.preventDefault();
    // In a real application, this would be saved to a backend
    console.log('Diet log:', {
      date: date.toDateString(),
      ...dietLog
    });
    
    // Reset form or show confirmation
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
      ];
    } else if (balanceData.pitta === 'increased') {
      return [
        { title: 'Diet', content: 'Favor cooling foods. Reduce spicy, oily and fermented foods.' },
        { title: 'Lifestyle', content: 'Avoid excessive heat. Practice cooling exercises and meditation.' },
      ];
    } else {
      return [
        { title: 'Diet', content: 'Focus on light, warm foods. Reduce heavy, oily and sweet foods.' },
        { title: 'Lifestyle', content: 'Increase physical activity. Practice stimulating yoga and breathing exercises.' },
      ];
    }
  };

  return (
    <div className="health-tracker-page">
      <h1>Health Tracker</h1>
      <p>Track your daily health metrics and habits according to Ayurvedic principles.</p>
      
      <div className="tracker-sections">
        <div className="tracker-section">
          <h2>Daily Wellness Log</h2>
          
          <div className="calendar">
            <div className="calendar-header">
              <button onClick={() => setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1))}>
                &lt; Previous
              </button>
              <h3>{date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h3>
              <button onClick={() => setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1))}>
                Next &gt;
              </button>
            </div>
            
            <div className="calendar-days">
              <div className="calendar-day day-name">Sun</div>
              <div className="calendar-day day-name">Mon</div>
              <div className="calendar-day day-name">Tue</div>
              <div className="calendar-day day-name">Wed</div>
              <div className="calendar-day day-name">Thu</div>
              <div className="calendar-day day-name">Fri</div>
              <div className="calendar-day day-name">Sat</div>
              {calendarDays}
            </div>
          </div>
          
          <p><strong>Selected Date:</strong> {date.toDateString()}</p>
          
          <form className="tracker-form" onSubmit={submitDailyLog}>
            <div className="form-group">
              <label>How are you feeling today?</label>
              <div className="mood-indicators">
                <div 
                  className={`mood-indicator ${selectedMood === 'great' ? 'selected' : ''}`}
                  onClick={() => handleMoodSelect('great')}
                >
                  😁
                </div>
                <div 
                  className={`mood-indicator ${selectedMood === 'good' ? 'selected' : ''}`}
                  onClick={() => handleMoodSelect('good')}
                >
                  🙂
                </div>
                <div 
                  className={`mood-indicator ${selectedMood === 'neutral' ? 'selected' : ''}`}
                  onClick={() => handleMoodSelect('neutral')}
                >
                  😐
                </div>
                <div 
                  className={`mood-indicator ${selectedMood === 'tired' ? 'selected' : ''}`}
                  onClick={() => handleMoodSelect('tired')}
                >
                  😩
                </div>
                <div 
                  className={`mood-indicator ${selectedMood === 'unwell' ? 'selected' : ''}`}
                  onClick={() => handleMoodSelect('unwell')}
                >
                  🤒
                </div>
              </div>
            </div>
            
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
        
        <div className="tracker-section">
          <h2>Diet Tracker</h2>
          <form className="tracker-form" onSubmit={submitDietLog}>
            <div className="form-group">
              <label htmlFor="breakfast">Breakfast</label>
              <textarea 
                id="breakfast" 
                name="breakfast" 
                value={dietLog.breakfast} 
                onChange={handleDietChange}
                placeholder="What did you have for breakfast?"
                rows="2"
              ></textarea>
            </div>
            
            <div className="form-group">
              <label htmlFor="lunch">Lunch</label>
              <textarea 
                id="lunch" 
                name="lunch" 
                value={dietLog.lunch} 
                onChange={handleDietChange}
                placeholder="What did you have for lunch?"
                rows="2"
              ></textarea>
            </div>
            
            <div className="form-group">
              <label htmlFor="dinner">Dinner</label>
              <textarea 
                id="dinner" 
                name="dinner" 
                value={dietLog.dinner} 
                onChange={handleDietChange}
                placeholder="What did you have for dinner?"
                rows="2"
              ></textarea>
            </div>
            
            <div className="form-group">
              <label htmlFor="snacks">Snacks</label>
              <textarea 
                id="snacks" 
                name="snacks" 
                value={dietLog.snacks} 
                onChange={handleDietChange}
                placeholder="What snacks did you have today?"
                rows="2"
              ></textarea>
            </div>
            
            <div className="form-group">
              <label htmlFor="water">Water Intake (glasses)</label>
              <input 
                type="number" 
                id="water" 
                name="water" 
                value={dietLog.water} 
                onChange={handleDietChange} 
                min="0"
                placeholder="How many glasses of water did you drink?"
              />
            </div>
            
            <button type="submit" className="submit-button">Save Diet Log</button>
          </form>
        </div>
        
        <div className="tracker-section">
          <h2>Balance Indicators</h2>
          
          <div className="health-metrics">
            <div className="metric-item">
              <span>Vata Dosha:</span>
              <span className={balanceData.vata === 'balanced' ? 'balanced' : 'imbalanced'}>
                {balanceData.vata.charAt(0).toUpperCase() + balanceData.vata.slice(1)}
              </span>
            </div>
            <div className="metric-item">
              <span>Pitta Dosha:</span>
              <span className={balanceData.pitta === 'balanced' ? 'balanced' : 'imbalanced'}>
                {balanceData.pitta.charAt(0).toUpperCase() + balanceData.pitta.slice(1)}
              </span>
            </div>
            <div className="metric-item">
              <span>Kapha Dosha:</span>
              <span className={balanceData.kapha === 'balanced' ? 'balanced' : 'imbalanced'}>
                {balanceData.kapha.charAt(0).toUpperCase() + balanceData.kapha.slice(1)}
              </span>
            </div>
          </div>
          
          <h3>Today's Recommendations</h3>
          <div className="recommendations">
            {getRecommendations().map((recommendation, index) => (
              <div className="recommendation" key={index}>
                <h4>{recommendation.title}</h4>
                <p>{recommendation.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HealthTracker;