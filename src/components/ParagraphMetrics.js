import React from 'react';

/**
 * ParagraphMetrics component to display typing performance metrics based on user input and paragraph.
 * @param {Object} props - The props object containing all properties passed to the component.
 * @param {string} props.input - The user's input text.
 * @param {string} props.paragraph - The paragraph text to compare the input against.
 * @param {number} props.timeLeft - The remaining time in seconds for the typing test.
 * @returns {JSX.Element} The rendered component displaying typing metrics.
 */
const ParagraphMetrics = ({ input, paragraph, timeLeft }) => {
    // Ensure input and paragraph are strings, default to empty if undefined
    const safeInput = input || '';
    const safeParagraph = paragraph || '';

    // Split the input and paragraph into arrays of words
    const inputWords = safeInput.trim().split(/\s+/).filter(Boolean); // Words typed by the user
    const paragraphWords = safeParagraph.split(/\s+/); // Words in the paragraph

    // Calculate the number of correct words typed by comparing input with paragraph
    const correctWordCount = inputWords.reduce((count, word, index) => {
        return word === paragraphWords[index] ? count + 1 : count; // Increase count if word matches
    }, 0);

    // Calculate total typed words and total words in the paragraph
    const totalTypedWords = inputWords.length;
    const totalWords = paragraphWords.length;

    // Calculate typing accuracy as a percentage
    const accuracy = totalTypedWords > 0 ? ((correctWordCount / totalTypedWords) * 100).toFixed(2) : '0.00';

    // Function to calculate Words Per Minute (WPM) based on time left and correct words
    const calculateWPM = () => {
        const totalSeconds = 60 - timeLeft; // Total seconds used for typing
        return totalSeconds > 0 ? ((correctWordCount / totalSeconds) * 60).toFixed(2) : '0.00';
    };

    const wpm = calculateWPM(); // Calculate WPM

    // Generate feedback messages based on accuracy and WPM
    const getFeedback = () => {
        let accuracyFeedback = '';
        let wpmFeedback = '';

        // Determine accuracy feedback
        if (accuracy >= 90) {
            accuracyFeedback = 'Excellent accuracy!';
        } else if (accuracy >= 75) {
            accuracyFeedback = 'Good accuracy!';
        } else if (accuracy >= 50) {
            accuracyFeedback = 'Fair accuracy!';
        } else {
            accuracyFeedback = 'Your accuracy needs improvement.';
        }

        // Determine WPM feedback
        if (wpm >= 80) {
            wpmFeedback = 'Excellent speed!';
        } else if (wpm >= 60) {
            wpmFeedback = 'Great speed!';
        } else if (wpm >= 40) {
            wpmFeedback = 'Average speed!';
        } else {
            wpmFeedback = 'Your typing speed needs improvement.';
        }

        return { wpmFeedback, accuracyFeedback };
    };

    const feedback = getFeedback(); // Get feedback based on calculations

    return (
        <div className="paragraph-metrics">
            <h3>Paragraph Typing Results:</h3>
            {/* Display calculated WPM */}
            <p><strong>Words Per Minute (WPM):</strong> {wpm}</p>
            {/* Display calculated accuracy percentage */}
            <p><strong>Accuracy:</strong> {accuracy}%</p>
            {/* Display feedback messages */}
            <p>{feedback.wpmFeedback}</p>
            <p>{feedback.accuracyFeedback}</p>
            {/* Provide a benchmark for average typing speed */}
            <p>The average adult typing speed is 35-40 WPM</p>
        </div>
    );
};

export default ParagraphMetrics;
