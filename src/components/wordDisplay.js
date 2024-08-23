// Import the React library to use JSX and create a functional component.
import React from 'react';

// Import the CSS file specific to the WordDisplay component for styling.
import './wordDisplay.css';

// Define the WordDisplay component as a functional component.
// It receives two props: `word` (the target word) and `input` (the user's current input).
// Default values are set to empty strings to prevent errors if props are not passed.
const WordDisplay = ({ word = '', input = '' }) => {
    
    // Define a function to render text with highlighted styles based on the user's input.
    const renderHighlightedText = () => {
        // Split the target word and user input into arrays of individual characters.
        const wordChars = word.split('');
        const inputChars = input.split('');

        // Map over each character in the target word to create a span element for each character.
        return wordChars.map((char, index) => {
            // Get the corresponding character from the user's input based on the current index.
            const inputChar = inputChars[index];

            // If the input character does not exist (user hasn't typed this far), 
            // return a span element with the original character and no additional styling.
            if (inputChar === undefined) return <span key={index}>{char}</span>;

            // If the input character matches the target character,
            // return a span element with the "correct" class to highlight it as correct.
            if (inputChar === char) {
                return <span key={index} className="correct">{char}</span>;
            
            // If the input character does not match the target character
            // and the user has typed more characters than the current index,
            // return a span element with the "incorrect" class to highlight it as incorrect.
            } else if (inputChars.length > index) {
                return <span key={index} className="incorrect">{char}</span>;

            // If none of the above conditions are met, 
            // return a span element with the original character and no additional styling.
            } else {
                return <span key={index}>{char}</span>;
            }
        });
    };

    // Return the main structure of the WordDisplay component.
    // It contains a div that displays the word with highlighted text using the renderHighlightedText function.
    return (
        <div className="WordDisplay">
            {renderHighlightedText()} {/* Call the function to display the word with highlighting */}
        </div>
    );
};

// Export the WordDisplay component as the default export of the module.
// This allows it to be imported and used in other parts of the application.
export default WordDisplay;
