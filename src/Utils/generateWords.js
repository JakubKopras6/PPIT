import WORDS from '../Data/wordList';

/**
 * Generates a list of random words from the WORDS array.
 * @param {number} num - The number of random words to generate.
 * @returns {string[]} An array containing the generated random words.
 */
export const generateWords = (num) => {
    // Initialize an empty array to store the generated words
    const words = [];

    // Loop to generate the specified number of words
    for (let i = 0; i < num; i++) {
        // Select a random index from the WORDS array
        const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)];
        // Add the randomly selected word to the words array
        words.push(randomWord);
    }

    // Return the array containing the generated random words
    return words;
};
