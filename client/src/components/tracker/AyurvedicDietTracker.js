import React from 'react';
import './AyurvedicDietTracker.css';

function AyurvedicDietTracker({ dietLog, handleDietChange, submitDietLog, primaryDosha }) {
  const tasteRecommendations = {
    vata: {
      recommended: ['Sweet', 'Sour', 'Salty'],
      reduce: ['Bitter', 'Astringent', 'Pungent']
    },
    pitta: {
      recommended: ['Sweet', 'Bitter', 'Astringent'],
      reduce: ['Pungent', 'Sour', 'Salty']
    },
    kapha: {
      recommended: ['Pungent', 'Bitter', 'Astringent'],
      reduce: ['Sweet', 'Sour', 'Salty']
    }
  };

  const getRecommendations = () => {
    return primaryDosha ? tasteRecommendations[primaryDosha] : tasteRecommendations.vata;
  };

  const tastes = getRecommendations();

  return (
    <div className="ayurvedic-diet-tracker">
      <div className="taste-recommendations">
        <h3>Taste Recommendations for Your Dosha</h3>
        <div className="taste-categories">
          <div className="taste-category">
            <h4>Favor These Tastes</h4>
            <div className="taste-list favor">
              {tastes.recommended.map((taste, index) => (
                <span key={index} className="taste-tag">{taste}</span>
              ))}
            </div>
          </div>
          <div className="taste-category">
            <h4>Reduce These Tastes</h4>
            <div className="taste-list reduce">
              {tastes.reduce.map((taste, index) => (
                <span key={index} className="taste-tag">{taste}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <h3>Daily Diet Log</h3>
      <form className="diet-form" onSubmit={submitDietLog}>
        <div className="meal-inputs">
          <div className="meal-input">
            <label htmlFor="breakfast">
              <span>Breakfast</span>
              <small>Recommend: warm, cooked, moderate portion</small>
            </label>
            <textarea 
              id="breakfast" 
              name="breakfast" 
              value={dietLog.breakfast} 
              onChange={handleDietChange}
              placeholder="What did you have for breakfast?"
              rows="2"
            ></textarea>
            <div className="meal-qualities">
              <div className="quality-selector">
                <span>Taste:</span>
                <select name="breakfastTaste" onChange={handleDietChange} value={dietLog.breakfastTaste || ''}>
                  <option value="">Select</option>
                  <option value="sweet">Sweet</option>
                  <option value="sour">Sour</option>
                  <option value="salty">Salty</option>
                  <option value="pungent">Pungent</option>
                  <option value="bitter">Bitter</option>
                  <option value="astringent">Astringent</option>
                </select>
              </div>
              <div className="quality-selector">
                <span>Temperature:</span>
                <select name="breakfastTemp" onChange={handleDietChange} value={dietLog.breakfastTemp || ''}>
                  <option value="">Select</option>
                  <option value="hot">Hot</option>
                  <option value="warm">Warm</option>
                  <option value="room">Room Temp</option>
                  <option value="cold">Cold</option>
                </select>
              </div>
            </div>
          </div>

          <div className="meal-input">
            <label htmlFor="lunch">
              <span>Lunch</span>
              <small>Recommend: largest meal of the day (12-1pm)</small>
            </label>
            <textarea 
              id="lunch" 
              name="lunch" 
              value={dietLog.lunch} 
              onChange={handleDietChange}
              placeholder="What did you have for lunch?"
              rows="2"
            ></textarea>
            <div className="meal-qualities">
              <div className="quality-selector">
                <span>Taste:</span>
                <select name="lunchTaste" onChange={handleDietChange} value={dietLog.lunchTaste || ''}>
                  <option value="">Select</option>
                  <option value="sweet">Sweet</option>
                  <option value="sour">Sour</option>
                  <option value="salty">Salty</option>
                  <option value="pungent">Pungent</option>
                  <option value="bitter">Bitter</option>
                  <option value="astringent">Astringent</option>
                </select>
              </div>
              <div className="quality-selector">
                <span>Temperature:</span>
                <select name="lunchTemp" onChange={handleDietChange} value={dietLog.lunchTemp || ''}>
                  <option value="">Select</option>
                  <option value="hot">Hot</option>
                  <option value="warm">Warm</option>
                  <option value="room">Room Temp</option>
                  <option value="cold">Cold</option>
                </select>
              </div>
            </div>
          </div>

          <div className="meal-input">
            <label htmlFor="dinner">
              <span>Dinner</span>
              <small>Recommend: light, easy to digest meal</small>
            </label>
            <textarea 
              id="dinner" 
              name="dinner" 
              value={dietLog.dinner} 
              onChange={handleDietChange}
              placeholder="What did you have for dinner?"
              rows="2"
            ></textarea>
            <div className="meal-qualities">
              <div className="quality-selector">
                <span>Taste:</span>
                <select name="dinnerTaste" onChange={handleDietChange} value={dietLog.dinnerTaste || ''}>
                  <option value="">Select</option>
                  <option value="sweet">Sweet</option>
                  <option value="sour">Sour</option>
                  <option value="salty">Salty</option>
                  <option value="pungent">Pungent</option>
                  <option value="bitter">Bitter</option>
                  <option value="astringent">Astringent</option>
                </select>
              </div>
              <div className="quality-selector">
                <span>Temperature:</span>
                <select name="dinnerTemp" onChange={handleDietChange} value={dietLog.dinnerTemp || ''}>
                  <option value="">Select</option>
                  <option value="hot">Hot</option>
                  <option value="warm">Warm</option>
                  <option value="room">Room Temp</option>
                  <option value="cold">Cold</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="supplement-inputs">
          <div className="input-row">
            <div className="input-group">
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

            <div className="input-group">
              <label htmlFor="herbs">Herbs & Supplements</label>
              <textarea 
                id="herbs" 
                name="herbs" 
                value={dietLog.herbs || ''} 
                onChange={handleDietChange}
                placeholder="Any herbs or supplements taken?"
                rows="2"
              ></textarea>
            </div>
          </div>

          <div className="input-row">
            <div className="input-group hydration">
              <label htmlFor="water">Water Intake</label>
              <div className="hydration-inputs">
                <div className="water-input">
                  <input 
                    type="number" 
                    id="water" 
                    name="water" 
                    value={dietLog.water} 
                    onChange={handleDietChange} 
                    min="0"
                    step="1"
                    placeholder="0"
                  />
                  <span>glasses</span>
                </div>
                <div className="hydration-type">
                  <label>
                    <input 
                      type="checkbox" 
                      name="warmWater" 
                      checked={dietLog.warmWater || false} 
                      onChange={(e) => handleDietChange({
                        target: { 
                          name: e.target.name, 
                          value: e.target.checked 
                        }
                      })} 
                    />
                    Warm water
                  </label>
                  <label>
                    <input 
                      type="checkbox" 
                      name="herbalTea" 
                      checked={dietLog.herbalTea || false} 
                      onChange={(e) => handleDietChange({
                        target: { 
                          name: e.target.name, 
                          value: e.target.checked 
                        }
                      })} 
                    />
                    Herbal tea
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="digestive-health">
          <h4>Digestive Health</h4>
          <div className="digestive-inputs">
            <div className="input-group">
              <label>Hunger Level Before Meals</label>
              <div className="rating-scale">
                <span>Low</span>
                <div className="rating-options">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <label key={value} className="rating-option">
                      <input 
                        type="radio" 
                        name="hungerLevel" 
                        value={value} 
                        checked={parseInt(dietLog.hungerLevel) === value} 
                        onChange={handleDietChange} 
                      />
                      <span>{value}</span>
                    </label>
                  ))}
                </div>
                <span>High</span>
              </div>
            </div>

            <div className="input-group">
              <label>Digestion Quality After Meals</label>
              <div className="rating-scale">
                <span>Poor</span>
                <div className="rating-options">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <label key={value} className="rating-option">
                      <input 
                        type="radio" 
                        name="digestionQuality" 
                        value={value} 
                        checked={parseInt(dietLog.digestionQuality) === value} 
                        onChange={handleDietChange} 
                      />
                      <span>{value}</span>
                    </label>
                  ))}
                </div>
                <span>Excellent</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="diet-notes">
          <label htmlFor="dietNotes">Additional Notes</label>
          <textarea 
            id="dietNotes" 
            name="dietNotes" 
            value={dietLog.notes || ''} 
            onChange={handleDietChange}
            placeholder="Any observations about your eating patterns or digestion today?"
            rows="3"
          ></textarea>
        </div>

        <button type="submit" className="submit-button">Save Diet Log</button>
      </form>
    </div>
  );
}

export default AyurvedicDietTracker;