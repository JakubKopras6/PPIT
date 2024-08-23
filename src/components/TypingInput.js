import React from 'react'; // Importing the React library to use JSX and React features.
import './TypingInput.css'; // Importing CSS for the TypingInput component styling.

const TypingInput = ({ input, handleInputChange }) => { // TypingInput is a functional component receiving two props: 'input' (current input value) and 'handleInputChange' (function to handle input change).

    // Create a new Audio object to play the typewriter sound effect.
    const typewriterSound = new Audio('/Typewriter.mp3');

    // Function to handle the key press event.
    const handleKeyPress = (e) => {
        typewriterSound.currentTime = 0; // Rewind the sound to the start to play it from the beginning.
        typewriterSound.play().catch((error) => { // Play the typewriter sound.
            console.error('Error playing sound:', error); // Log any errors if the sound fails to play.
        });
    };

    // Function to handle changes in the input field.
    const onChange = (e) => {
        handleInputChange(e); // Call the provided handleInputChange function with the event.
    };

    // Rendering the input field.
    return (
        <div className="TypingInput"> {/* Container div with the class 'TypingInput' for styling purposes. */}
            <input 
                type="text"  // Text input field where users will type.
                value={input} // Bind the input field value to the 'input' prop.
                onKeyPress={handleKeyPress} // Attach the key press event handler to play the typewriter sound on key press.
                onChange={onChange} // Attach the change event handler to handle input changes.
                placeholder="Start typing here..." // Placeholder text for the input field.
            />
        </div>
    );
};

export default TypingInput; // Exporting the TypingInput component as the default export of the module.
