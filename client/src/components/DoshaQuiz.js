import React, { useState } from 'react';
import '../styles/DoshaQuiz.css';

function DoshaQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    vata: 0,
    pitta: 0,
    kapha: 0
  });
  const [result, setResult] = useState(null);

  const questions = [
    {
      question: "What best describes your body frame?",
      options: [
        { text: "Thin, lanky, or light", dosha: "vata" },
        { text: "Medium, muscular, or athletic", dosha: "pitta" },
        { text: "Larger, solid, or heavy-set", dosha: "kapha" }
      ]
    },
    {
      question: "How would you describe your skin?",
      options: [
        { text: "Dry, rough, or thin", dosha: "vata" },
        { text: "Warm, reddish, or sensitive", dosha: "pitta" },
        { text: "Thick, oily, or cool", dosha: "kapha" }
      ]
    },
    {
      question: "Which best describes your appetite?",
      options: [
        { text: "Variable, sometimes forget to eat", dosha: "vata" },
        { text: "Strong, get irritable if meals are missed", dosha: "pitta" },
        { text: "Steady, can easily skip meals", dosha: "kapha" }
      ]
    }
  ];

  const handleAnswer = (dosha) => {
    const newAnswers = { ...answers };
    newAnswers[dosha] += 1;
    setAnswers(newAnswers);
    
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (finalAnswers) => {
    let dominantDosha = "vata";
    let highestScore = finalAnswers.vata;
    
    if (finalAnswers.pitta > highestScore) {
      dominantDosha = "pitta";
      highestScore = finalAnswers.pitta;
    }
    
    if (finalAnswers.kapha > highestScore) {
      dominantDosha = "kapha";
    }
    
    setResult(dominantDosha);
  };

  const resetQuiz = () => {
    setStep(0);
    setAnswers({ vata: 0, pitta: 0, kapha: 0 });
    setResult(null);
  };

  if (result) {
    return (
      <div className="dosha-quiz">
        <h2>Your Dominant Dosha</h2>
        <div className="result">
          <h3>{result.charAt(0).toUpperCase() + result.slice(1)}</h3>
          {result === "vata" && (
            <p>Your dominant energy is Vata, which represents air and space. You're likely creative, quick-thinking, and energetic when balanced.</p>
          )}
          {result === "pitta" && (
            <p>Your dominant energy is Pitta, which represents fire and water. You're likely focused, intelligent, and goal-oriented when balanced.</p>
          )}
          {result === "kapha" && (
            <p>Your dominant energy is Kapha, which represents earth and water. You're likely calm, nurturing, and strong when balanced.</p>
          )}
          <button onClick={resetQuiz}>Retake Quiz</button>
        </div>
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
              onClick={() => handleAnswer(option.dosha)}
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