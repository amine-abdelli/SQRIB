/**
 * Represents a simple Markov Chain for generating random words based on a set of input letters.
 */
export class MarkovChain {
  // The chain object, where the key is a letter, and the value is an array of letters
  // that may follow the key.
  private chain: { [key: string]: string[] };

  /**
   * Initializes the MarkovChain with a given set of letters.
   * @param letters - An array of input letters to be used for constructing the chain.
   */
  constructor(letters: string[]) {
    this.chain = {};

    // Iterate through the input letters to construct the chain
    for (let i = 0; i < letters.length - 1; i += 1) {
      if (!this.chain[letters[i]]) {
        this.chain[letters[i]] = [];
      }
      this.chain[letters[i]].push(letters[i + 1]);
    }
  }

  /**
   * Generates a random word with a specified length range, containing the required letter.
   * @param minLength - The minimum length of the generated word.
   * @param maxLength - The maximum length of the generated word.
   * @param requiredLetter - A letter that must be included in the generated word.
   * @returns A randomly generated word containing the required letter.
   */
  generateWord(minLength: number, maxLength: number, requiredLetter: string): string {
    let word = '';

    do {
      word = '';
      const wordLength = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
      let currentLetter = this.getRandomLetter();

      for (let i = 0; i < wordLength; i += 1) {
        word += currentLetter;
        currentLetter = this.getNextLetter(currentLetter);
      }
    } while (!word.includes(requiredLetter));
    return word;
  }

  /**
   * Gets a random letter from the chain.
   * @returns A randomly selected letter from the chain.
   */
  private getRandomLetter(): string {
    const letters = Object.keys(this.chain);
    return letters[Math.floor(Math.random() * letters.length)];
  }

  /**
   * Gets the next letter based on the current letter and the chain.
   * @param currentLetter - The current letter in the chain.
   * @returns The next letter based on the chain, or a random letter if there is
   * no valid next letter.
   */
  private getNextLetter(currentLetter: string): string {
    const nextLetters = this.chain[currentLetter] || [];
    if (nextLetters.length === 0) {
      return this.getRandomLetter();
    }
    return nextLetters[Math.floor(Math.random() * nextLetters.length)];
  }
}

/**
 * Generates a specified number of random words within a given length range using a
 * set of input letters.
 * @param count - The number of random words to generate.
 * @param minLength - The minimum length of each generated word.
 * @param maxLength - The maximum length of each generated word.
 * @param letters - An array of input letters to be used for generating words.
 * @returns An array of randomly generated words.
 */
export function generateRandomWords(
  count: number,
  minLength: number,
  maxLength: number,
  letters: string[],
): string[] {
  const markovChain = new MarkovChain(letters);
  const words: string[] = [];
  const requiredLetter = letters[letters.length - 1];
  for (let i = 0; i < count; i += 1) {
    words.push(markovChain.generateWord(minLength, maxLength, requiredLetter));
  }
  return words;
}

/**
 * Filters a list of words and returns the ones that match a set of input letters and
 * contain a targeted letter.
 * @param letters - An array of input letters to match against.
 * @param wordList - An array of words to filter.
 * @param targetedLetter - The letter that each word must contain to be included in the result.
 * @returns An array of words that match the input letters and contain the targeted letter.
 */
export function getMatchingWords(
  letters: string[],
  wordList: string[],
  targetedLetter: string,
): string[] {
  return wordList.filter((word) => {
    const wordLetters = word.split('');
    return wordLetters.every((letter) => letters.includes(letter)) && word.includes(targetedLetter);
  });
}

/**
 * Inserts prioritized words at random positions within an array of random words.
 * @param prioritizedWords - An array of words to be inserted at random positions.
 * @param randomWords - An array of random words.
 * @returns An array with prioritized words inserted at random positions.
 */
export function insertWordsAtRandomPositions(
  prioritizedWords: string[],
  randomWords: string[],
): string[] {
  const result: string[] = [...randomWords];

  prioritizedWords.forEach((word) => {
    const randomIndex = Math.floor(Math.random() * (result.length + 1));
    result.splice(randomIndex, 0, word);
  });

  return result;
}

/**
 * Generates a specified number of random words within a given length range using a set of
 * input letters, prioritizing words from a provided list.
 * @param count - The number of random words to generate.
 * @param minLength - The minimum length of each generated word.
 * @param maxLength - The maximum length of each generated word.
 * @param letters - An array of input letters to be used for generating words.
 * @param wordList - An array of words to prioritize.
 * @returns An array of randomly generated words, with prioritized words inserted at random
 * positions.
 */
export function generateRandomWordsWithPriority(
  count: number,
  minLength: number,
  maxLength: number,
  letters: string[],
  wordList: string[],
): string[] {
  const matchingWords = getMatchingWords(letters, wordList, letters[letters.length - 1]);
  if (matchingWords.length >= count) {
    return matchingWords.slice(0, count);
  }
  const randomWords = generateRandomWords(
    count - matchingWords.length,
    minLength,
    maxLength,
    letters,
  );
  return insertWordsAtRandomPositions(matchingWords, randomWords);
}
