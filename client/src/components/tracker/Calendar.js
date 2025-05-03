import React from 'react';
import './Calendar.css';

function Calendar({ date, setDate }) {
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
    
    const isSelected = 
      currentDate.getDate() === date.getDate() &&
      currentDate.getMonth() === date.getMonth() &&
      currentDate.getFullYear() === date.getFullYear();
      
    calendarDays.push(
      <div 
        key={`day-${i}`} 
        className={`calendar-day ${isToday ? 'today' : ''} ${isSelected ? 'active' : ''}`}
        onClick={() => setDate(new Date(date.getFullYear(), date.getMonth(), i))}
      >
        {i}
      </div>
    );
  }

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button 
          onClick={() => setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1))}
          className="calendar-nav-button"
        >
          &lt; Previous
        </button>
        <h3>{date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h3>
        <button 
          onClick={() => setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1))}
          className="calendar-nav-button"
        >
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
      
      <div className="calendar-legend">
        <div className="legend-item">
          <div className="legend-color today"></div>
          <span>Today</span>
        </div>
        <div className="legend-item">
          <div className="legend-color active"></div>
          <span>Selected</span>
        </div>
        <div className="legend-item">
          <div className="legend-color has-entry"></div>
          <span>Has Entries</span>
        </div>
      </div>
    </div>
  );
}

export default Calendar;