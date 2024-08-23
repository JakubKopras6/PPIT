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

