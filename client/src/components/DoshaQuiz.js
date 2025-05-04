import React, { useState, useEffect } from 'react';
import '../styles/DoshaQuiz.css';
import doshaService from '../services/doshaService';

function DoshaQuiz() {
  const [step, setStep] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuizQuestions = async () => {
      try {
        setLoading(true);
        const data = await doshaService.getQuizQuestions();
        setQuestions(data);
        // Initialize empty answers array based on number of questions
        setAnswers(Array(data.length).fill(null));
        setLoading(false);
      } catch (err) {
        setError('Failed to load quiz questions. Please try again later.');
        setLoading(false);
        console.error('Error fetching quiz questions:', err);
      }
    };

    fetchQuizQuestions();
  }, []);

  const handleAnswer = (optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[step] = optionIndex;
    setAnswers(newAnswers);
    
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      submitQuiz(newAnswers);
    }
  };

  const submitQuiz = async (finalAnswers) => {
    try {
      setLoading(true);
      const quizResult = await doshaService.submitQuizAnswers(finalAnswers);
      setResult(quizResult);
      setLoading(false);
    } catch (err) {
      setError('Failed to submit quiz. Please try again.');
      setLoading(false);
      console.error('Error submitting quiz:', err);
    }
  };

  const resetQuiz = () => {
    setStep(0);
    setAnswers(Array(questions.length).fill(null));
    setResult(null);
  };

  if (loading) {
    return (
      <div className="dosha-quiz">
        <div className="loading">Loading quiz...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dosha-quiz">
        <div className="error">{error}</div>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  if (result) {
    return (
      <div className="dosha-quiz">
        <h2>Your Dosha Profile</h2>
        <div className="result">
          <h3>{result.primaryDosha.charAt(0).toUpperCase() + result.primaryDosha.slice(1)}</h3>
          <p>{result.description}</p>
          
          <div className="dosha-breakdown">
            <h4>Your Dosha Breakdown:</h4>
            <div className="dosha-percentages">
              <div className="dosha-bar">
                <span className="dosha-label">Vata:</span>
                <div className="dosha-progress">
                  <div className="dosha-fill vata" style={{width: `${result.percentages.vata}%`}}></div>
                </div>
                <span className="dosha-percent">{result.percentages.vata}%</span>
              </div>
              
              <div className="dosha-bar">
                <span className="dosha-label">Pitta:</span>
                <div className="dosha-progress">
                  <div className="dosha-fill pitta" style={{width: `${result.percentages.pitta}%`}}></div>
                </div>
                <span className="dosha-percent">{result.percentages.pitta}%</span>
              </div>
              
              <div className="dosha-bar">
                <span className="dosha-label">Kapha:</span>
                <div className="dosha-progress">
                  <div className="dosha-fill kapha" style={{width: `${result.percentages.kapha}%`}}></div>
                </div>
                <span className="dosha-percent">{result.percentages.kapha}%</span>
              </div>
            </div>
          </div>
          
          <div className="recommendations">
            <h4>Recommendations for Balance:</h4>
            <ul>
              {result.recommendations.map((recommendation, index) => (
                <li key={index}>{recommendation}</li>
              ))}
            </ul>
          </div>
          
          <button onClick={resetQuiz}>Retake Quiz</button>
        </div>
      </div>
    );
  }

  // If there are no questions yet or we've hit an edge case
  if (!questions.length) {
    return (
      <div className="dosha-quiz">
        <div className="error">No questions available. Please try again later.</div>
      </div>
    );
  }

  return (
    <div className="dosha-quiz">
      <h2>Discover Your Dosha</h2>
      <div className="question">
        <h3>{questions[step].question}</h3>
        <div className="options">
          {questions[step].options.map((option, index) => (
            <button 
              key={index} 
              onClick={() => handleAnswer(index)}
              className="option-button"
            >
              {option.text}
            </button>
          ))}
        </div>
        <div className="progress">
          Question {step + 1} of {questions.length}
        </div>
      </div>
    </div>
  );
}

export default DoshaQuiz;