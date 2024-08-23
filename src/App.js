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