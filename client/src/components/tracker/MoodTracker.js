import React from 'react';
import './MoodTracker.css';

function MoodTracker({ selectedMood, setSelectedMood }) {
  const moods = [
    { id: 'great', emoji: '😁', label: 'Great' },
    { id: 'good', emoji: '🙂', label: 'Good' },
    { id: 'neutral', emoji: '😐', label: 'Neutral' },
    { id: 'tired', emoji: '😩', label: 'Tired' },
    { id: 'unwell', emoji: '🤒', label: 'Unwell' },
    { id: 'stressed', emoji: '😰', label: 'Stressed' },
    { id: 'sad', emoji: '😔', label: 'Sad' },
    { id: 'anxious', emoji: '😟', label: 'Anxious' }
  ];

  const handleMoodSelect = (moodId) => {
    setSelectedMood(moodId);
  };

  return (
    <div className="mood-tracker">
      <label className="mood-label">How are you feeling today?</label>
      <div className="mood-indicators">
        {moods.map(mood => (
          <div 
            key={mood.id}
            className={`mood-indicator ${selectedMood === mood.id ? 'selected' : ''}`}
            onClick={() => handleMoodSelect(mood.id)}
            title={mood.label}
          >
            <div className="mood-emoji">{mood.emoji}</div>
            <span className="mood-label">{mood.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MoodTracker;