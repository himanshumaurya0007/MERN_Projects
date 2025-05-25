import { useState } from 'react';
import questions from './data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleChevronLeft, faCircleChevronRight } from '@fortawesome/free-solid-svg-icons'
import './App.css';

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const current = questions[currentQuestion];

  const handleOptionChange = (option) => {
    if (Array.isArray(current.answer) && current.answer.length > 1) {
      // Multiple choice (checkbox)
      if (selectedOptions.includes(option)) {
        setSelectedOptions(selectedOptions.filter((o) => o !== option));
      } else {
        setSelectedOptions([...selectedOptions, option]);
      }
    } else {
      // Single choice (radio)
      setSelectedOptions([option]);
    }
  };

  const handleSubmit = () => {
    if (Array.isArray(current.answer)) {
      const correctAnswers = current.answer.sort().join(',');
      const selectedAnswers = selectedOptions.sort().join(',');
      if (correctAnswers === selectedAnswers) {
        setScore(score + 1);
      }
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedOptions([]);
    } else {
      setShowScore(true);
    }
  };

   // ⭐ New function: move to previous question
   const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOptions([]); // Clear selected options when going back
    }
  };

  // ⭐ New function: move to next question
  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOptions([]); // Clear selected options when going forward
    }
  };

  return (
    <>
      <div className="app-container">
        <h1>Quiz App</h1>

        {showScore ? (
          <div className="score-section">
            You scored {score} out of {questions.length}!
          </div>
        ) : (
          <div className="question-section">
            <div className='question-nav-menu'>

              <div className="question-count">
                <span>Question {currentQuestion + 1}</span>/{questions.length}
              </div>
              <div className="question-nav-menu-icons">
              <FontAwesomeIcon
                  icon={faCircleChevronLeft}
                  className={`nav-icon previous ${currentQuestion === 0 ? 'disabled' : ''}`}
                  onClick={handlePrevious}
                />
                <FontAwesomeIcon
                  icon={faCircleChevronRight}
                  className={`nav-icon ${currentQuestion === questions.length - 1 ? 'disabled' : ''}`}
                  onClick={handleNext}
                />
              </div>
            </div>
            <div className="question-text">{current.question}</div>
            <div className="answer-section">
              {current.options.map((option, index) => (
                <div key={index} className="option-item">
                  <label>
                    <input
                      type={Array.isArray(current.answer) && current.answer.length > 1 ? "checkbox" : "radio"}
                      name="option"
                      value={option}
                      checked={selectedOptions.includes(option)}
                      onChange={() => handleOptionChange(option)}
                    />
                    {option}
                  </label>
                </div>
              ))}
            </div>
            <button onClick={handleSubmit} className="submit-button">Submit</button>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
