import React from 'react';
import './DoshaBalanceTracker.css';

function DoshaBalanceTracker({ balanceData, recommendations }) {
  return (
    <div className="dosha-balance-tracker">
      <h3>Dosha Balance Indicators</h3>
      
      <div className="dosha-balance-meters">
        <div className="dosha-meter">
          <div className="dosha-title">
            <h4>Vata</h4>
            <span className={`dosha-status ${balanceData.vata}`}>
              {balanceData.vata.charAt(0).toUpperCase() + balanceData.vata.slice(1)}
            </span>
          </div>
          <div className="dosha-bar">
            <div 
              className={`dosha-bar-fill vata ${balanceData.vata}`} 
              style={{ width: balanceData.vata === 'balanced' ? '50%' : balanceData.vata === 'increased' ? '80%' : '30%' }}
            ></div>
          </div>
          <div className="dosha-description">
            <span>Air & Ether</span>
            <p>Controls movement and change. Affects nervous system and mental health.</p>
          </div>
        </div>
        
        <div className="dosha-meter">
          <div className="dosha-title">
            <h4>Pitta</h4>
            <span className={`dosha-status ${balanceData.pitta}`}>
              {balanceData.pitta.charAt(0).toUpperCase() + balanceData.pitta.slice(1)}
            </span>
          </div>
          <div className="dosha-bar">
            <div 
              className={`dosha-bar-fill pitta ${balanceData.pitta}`} 
              style={{ width: balanceData.pitta === 'balanced' ? '50%' : balanceData.pitta === 'increased' ? '80%' : '30%' }}
            ></div>
          </div>
          <div className="dosha-description">
            <span>Fire & Water</span>
            <p>Controls metabolism and transformation. Affects digestion and body temperature.</p>
          </div>
        </div>
        
        <div className="dosha-meter">
          <div className="dosha-title">
            <h4>Kapha</h4>
            <span className={`dosha-status ${balanceData.kapha}`}>
              {balanceData.kapha.charAt(0).toUpperCase() + balanceData.kapha.slice(1)}
            </span>
          </div>
          <div className="dosha-bar">
            <div 
              className={`dosha-bar-fill kapha ${balanceData.kapha}`} 
              style={{ width: balanceData.kapha === 'balanced' ? '50%' : balanceData.kapha === 'increased' ? '80%' : '30%' }}
            ></div>
          </div>
          <div className="dosha-description">
            <span>Earth & Water</span>
            <p>Controls stability and structure. Affects immunity and emotional wellbeing.</p>
          </div>
        </div>
      </div>
      
      <div className="dosha-recommendations">
        <h3>Daily Recommendations</h3>
        <div className="recommendations-list">
          {recommendations.map((recommendation, index) => (
            <div className="recommendation-card" key={index}>
              <div className="recommendation-icon">
                {recommendation.title === 'Diet' ? '🍽️' : recommendation.title === 'Lifestyle' ? '🧘‍♀️' : '💧'}
              </div>
              <div className="recommendation-content">
                <h4>{recommendation.title}</h4>
                <p>{recommendation.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DoshaBalanceTracker;