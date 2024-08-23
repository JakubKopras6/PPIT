import React from 'react';
import './ParagraphDisplay.css';

/**
 * ParagraphDisplay component to show a paragraph with typed input highlighted.
 * @param {Object} props - The props object containing all properties passed to the component.
 * @param {string} props.paragraph - The paragraph text to be displayed and compared against the input.
 * @param {string} props.input - The user input text that will be highlighted against the paragraph.
 * @returns {JSX.Element} The rendered component.
 */
const ParagraphDisplay = ({ paragraph, input }) => {
    /**
     * Function to generate a highlighted version of the paragraph based on user input.
     * It compares each character of the paragraph with the corresponding character in the input.
     * Correctly typed characters are highlighted with the 'correct' class,
     * and incorrectly typed characters are highlighted with the 'incorrect' class.
     * Characters beyond the length of the input are displayed without any highlighting.
     * 
     * @returns {JSX.Element[]} An array of <span> elements representing the paragraph with highlighted text.
     */
    const getHighlightedParagraph = () => {
        const inputLength = input.length; // Length of the user input
        return paragraph.split('').map((char, index) => {
            const isCorrect = index < inputLength && char === input[index]; // Determine if the character is correct
            return (
                <span 
                    key={index} 
                    className={isCorrect ? 'correct' : (index < inputLength ? 'incorrect' : '')}
                >
                    {char} {/* Display the character */}
                </span>
            );
        });
    };

    return (
        <div className="paragraph-display">
            {getHighlightedParagraph()} {/* Render the highlighted paragraph */}
        </div>
    );
};

export default ParagraphDisplay;
