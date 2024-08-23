import React, { useState, useEffect } from 'react';
import WordDisplay from './components/wordDisplay';
import TypingInput from './components/TypingInput';
import Timer from './components/Timer';
import ParagraphDisplay from './components/ParagraphDisplay';
import ParagraphMetrics from './components/ParagraphMetrics';
import { WORDS, PARAGRAPHS } from './Data/wordList';
import './styles/App.css';

// Helper function to get a random word from an array of words
const getRandomWord = (words) => words[Math.floor(Math.random() * words.length)];

// Helper function to get a random paragraph from an array of paragraphs
const getRandomParagraph = (paragraphs) => paragraphs[Math.floor(Math.random() * paragraphs.length)];

// Custom hook to handle the timer functionality
const useTimer = (isStarted, timeLeft, setTimeLeft, setIsFinished, setIsStarted) => {
  useEffect(() => {
      if (isStarted && timeLeft > 0) {
          // Set a timeout to decrease the timeLeft by 1 every second
          const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
          // Cleanup the timeout on component unmount or when dependencies change
          return () => clearTimeout(timer);
      } else if (timeLeft === 0) {
          // When time runs out, set the test as finished and stop it
          setIsFinished(true);
          setIsStarted(false);
      }
  }, [isStarted, timeLeft]);
};

// Custom hook to update content based on the mode and difficulty
const useContentUpdate = (isStarted, mode, difficulty, paragraphDifficulty, setWords, setCurrentWord, setParagraph) => {
  useEffect(() => {
      if (isStarted) {
          if (mode === 'words') {
              // Set words and the current word for word mode
              setWords(WORDS[difficulty]);
              setCurrentWord(getRandomWord(WORDS[difficulty]));
          } else if (mode === 'paragraph') {
              // Set the paragraph for paragraph mode
              const difficultyLevel = paragraphDifficulty || 'easy';
              setParagraph(getRandomParagraph(PARAGRAPHS[difficultyLevel]));
          }
      }
  }, [isStarted, mode, difficulty, paragraphDifficulty]);
};

const App = () => {
  // State hooks for managing the app's state
  const [difficulty, setDifficulty] = useState(null); // Difficulty level for word mode
  const [paragraphDifficulty, setParagraphDifficulty] = useState(null); // Difficulty level for paragraph mode
  const [words, setWords] = useState([]); // List of words to be displayed
  const [currentWord, setCurrentWord] = useState(''); // Current word to be typed
  const [paragraph, setParagraph] = useState(''); // Paragraph to be typed
  const [input, setInput] = useState(''); // User input
  const [correctWords, setCorrectWords] = useState(0); // Count of correctly typed words
  const [incorrectWords, setIncorrectWords] = useState(0); // Count of incorrectly typed words
  const [timeLeft, setTimeLeft] = useState(60); // Time left for the test
  const [isStarted, setIsStarted] = useState(false); // Whether the test has started
  const [isFinished, setIsFinished] = useState(false); // Whether the test has finished
  const [showPrompt, setShowPrompt] = useState(true); // Whether to show the prompt or not
  const [mode, setMode] = useState('words'); // Current mode ('words' or 'paragraph')

  //custom hooks to manage the timer and content updates
  useTimer(isStarted, timeLeft, setTimeLeft, setIsFinished, setIsStarted);
  useContentUpdate(isStarted, mode, difficulty, paragraphDifficulty, setWords, setCurrentWord, setParagraph);

  // Function to handle the start of the test
  const handleStart = () => {
    setShowPrompt(false);
    setIsStarted(true);
    setIsFinished(false);
    setInput('');
    setCorrectWords(0);
    setIncorrectWords(0);
    setTimeLeft(60);

     // Set initial words or paragraph based on the mode
     if (mode === 'words') {
      setWords(WORDS[difficulty]);
      setCurrentWord(getRandomWord(WORDS[difficulty]));
  } else if (mode === 'paragraph') {
      setParagraph(getRandomParagraph(PARAGRAPHS[paragraphDifficulty || 'easy']));
  }
};

// Function to handle changes in user input
const handleInputChange = (e) => {
  const value = e.target.value;
  setInput(value);

  if (mode === 'words') {
      // In word mode, check for correct and incorrect words
      if (value.endsWith(' ')) {
          const word = value.trim();
          if (word === currentWord) {
              setCorrectWords(prev => prev + 1);
              setCurrentWord(getRandomWord(words));
          } else {
              setIncorrectWords(prev => prev + 1);
          }
          setInput('');
      }
  } else if (mode === 'paragraph') {
      // In paragraph mode, check for correct and incorrect words
      const inputWords = value.trim().split(/\s+/).filter(Boolean);
      const paragraphWords = paragraph.split(/\s+/);

      const correctWordCount = inputWords.reduce((count, word, index) => 
          word === paragraphWords[index] ? count + 1 : count, 0);

      const totalTypedWords = inputWords.length;
      const totalWords = paragraphWords.length;

      setCorrectWords(correctWordCount);
      setIncorrectWords(totalTypedWords - correctWordCount);

      // Check if the entire paragraph is typed correctly
      if (value.trim() === paragraph) {
          setIsFinished(true);
          setIsStarted(false);
      }
  }
};

// Calculate Words Per Minute (WPM)
const calculateWPM = () => ((correctWords / (60 - timeLeft)) * 60).toFixed(2);

// Calculate accuracy as a percentage
const calculateAccuracy = () => ((correctWords / (correctWords + incorrectWords)) * 100).toFixed(2);

// Generate feedback based on WPM
const getFeedback = (wpm) => {
  if (wpm >= 80) return 'Excellent speed!';
  if (wpm >= 60) return 'Great speed!';
  if (wpm >= 40) return 'Average speed!';
  return 'Your typing speed needs improvement.';
};

// Generate feedback based on accuracy
const getAccuracyFeedback = (accuracy) => {
  if (accuracy >= 90) return 'Excellent accuracy!';
  if (accuracy >= 75) return 'Good accuracy!';
  if (accuracy >= 50) return 'Fair accuracy!';
  return 'Your accuracy needs improvement.';
};

// Handle the action when "Go Back" is clicked
const handleGoBack = () => {
  setShowPrompt(true);
  setIsFinished(false);
  setIsStarted(false);
  setDifficulty(null);
  setParagraphDifficulty(null);
  setMode('words');
};

// Determine if the start button should be disabled based on selected mode and difficulty
const isStartButtonDisabled = () => {
  if (mode === 'words' && difficulty === null) return true;
  if (mode === 'paragraph' && paragraphDifficulty === null) return true;
  return !mode;
};

return (
  <div className="app">
      {/* Render the prompt if the test hasn't started yet */}
      {showPrompt && (
          <div className="prompt">
              <h1>Welcome to the Typing Speed Test!</h1>
              <p>Select a mode to begin:</p>
              <button onClick={() => setMode('words')} className={`mode-button ${mode === 'words' ? 'selected' : ''}`}>Word Mode</button>
              <button onClick={() => setMode('paragraph')} className={`mode-button ${mode === 'paragraph' ? 'selected' : ''}`}>Paragraph Mode</button>
              {mode === 'words' && (
                  <>
                      <p>Select word difficulty:</p>
                      {['easy', 'medium', 'intermediate'].map(diff => (
                          <button key={diff} onClick={() => setDifficulty(diff)} className={`difficulty-button ${difficulty === diff ? 'selected' : ''}`}>
                              {diff.charAt(0).toUpperCase() + diff.slice(1)}
                          </button>
                      ))}
                  </>
              )}
              {mode === 'paragraph' && (
                  <>
                      <p>Select a paragraph difficulty:</p>
                      {['easy', 'medium', 'intermediate'].map(diff => (
                          <button key={diff} onClick={() => setParagraphDifficulty(diff)} className={`difficulty-button ${paragraphDifficulty === diff ? 'selected' : ''}`}>
                              {diff.charAt(0).toUpperCase() + diff.slice(1)}
                          </button>
                      ))}
                  </>
              )}
              <button onClick={handleStart} className="start-button" disabled={isStartButtonDisabled()}>Start</button>
          </div>
      )}
      {/* Render the typing interface if the test is in progress */}
      {!showPrompt && !isFinished && (
          <div>
              <Timer timeLeft={timeLeft} />
              {mode === 'words' ? (
                  <>
                      <WordDisplay word={currentWord} input={input} />
                      <TypingInput input={input} handleInputChange={handleInputChange} />
                  </>
              ) : (
                  <>
                      <ParagraphDisplay paragraph={paragraph} input={input} />
                      <TypingInput input={input} handleInputChange={handleInputChange} />
                  </>
              )}
          </div>
      )}
      {/* Render results and feedback when the test is finished */}
      {isFinished && (
          <div>
              <h2>Time's Up!</h2>
              {mode === 'words' ? (
                  <>
                      <h3>Words Per Minute (WPM): {calculateWPM()}</h3>
                      <h3>Accuracy: {calculateAccuracy()}%</h3>
                      <h3>{getFeedback(calculateWPM())}</h3>
                      <h3>{getAccuracyFeedback(calculateAccuracy())}</h3>
                      <h3>The average adult typing speed is 35-40 WPM</h3>
                  </>
              ) : (
                  <ParagraphMetrics input={input} paragraph={paragraph} timeLeft={timeLeft} />
              )}
              <button onClick={handleStart} className="start-button">Try Again</button>
              <button onClick={handleGoBack} className="start-button">Go Back</button>
          </div>
      )}
  </div>
);
};

export default App;


