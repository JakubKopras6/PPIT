// src/components/Timer.js
import React from 'react';
import './Timer.css';

const Timer = ({ timeLeft }) => {
    return (
        <div className="timer">
            <h2>Time Left: {timeLeft}s</h2>
        </div>
    );
};

export default Timer;
