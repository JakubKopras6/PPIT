
// src/components/TypewriterSound.js
import React, { useEffect } from 'react';

const TypewriterSound = ({ play }) => {
    useEffect(() => {
        if (play) {
            const audio = new Audio('/Typewriter.mp3');
            audio.play().catch((error) => {
                console.error('Error playing sound:', error);
            });
        }
    }, [play]);

    return null;
};

export default TypewriterSound;
