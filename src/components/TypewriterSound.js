import React, { useEffect } from 'react'; // Importing React and the useEffect hook from the React library.

/**
 * TypewriterSound component to play a typewriter sound effect.
 * @param {Object} props - The props object containing all properties passed to the component.
 * @param {boolean} props.play - A boolean flag that determines if the sound should be played.
 */
const TypewriterSound = ({ play }) => { // Define a functional component 'TypewriterSound' which takes a 'play' prop.
    
    useEffect(() => { // useEffect hook to perform side effects in functional components.
        if (play) { // Check if the 'play' prop is true.
            const audio = new Audio('/Typewriter.mp3'); // Create a new Audio object with the path to the typewriter sound file.
            audio.play().catch((error) => { // Attempt to play the audio.
                console.error('Error playing sound:', error); // Log any errors to the console if the sound fails to play.
            });
        }
    }, [play]); // The effect depends on the 'play' prop, meaning it will re-run whenever 'play' changes.

    return null; // This component does not render any visible UI, so it returns null.
};

export default TypewriterSound; // Exporting the TypewriterSound component as the default export of the module.
