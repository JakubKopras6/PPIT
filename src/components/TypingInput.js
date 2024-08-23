// src/components/TypingInput.js
import React from 'react';
import './TypingInput.css';

const TypingInput = ({ input, handleInputChange }) => {
    const typewriterSound = new Audio('/Typewriter.mp3');

    const handleKeyPress = (e) => {
        typewriterSound.currentTime = 0; // Rewind to start
        typewriterSound.play().catch((error) => {
            console.error('Error playing sound:', error);
        });
    };

    const onChange = (e) => {
        handleInputChange(e);
    };

    return (
        <div className="TypingInput">
            <input 
                type="text" 
                value={input} 
                onKeyPress={handleKeyPress} 
                onChange={onChange} 
                placeholder="Start typing here..." 
            />
        </div>
    );
};

export default TypingInput;

