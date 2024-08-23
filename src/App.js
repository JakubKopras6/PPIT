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