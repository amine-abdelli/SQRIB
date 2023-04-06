import {
  MarkovChain, generateRandomWords, generateRandomWordsWithPriority,
  getMatchingWords, insertWordsAtRandomPositions,
} from '../../src/utils/markov.utils';

describe('MarkovChain', () => {
  test('Should create a word with requiredLetter', () => {
    const inputLetters = ['a', 'b', 'c', 'd'];
    const minLength = 3;
    const maxLength = 5;
    const requiredLetter = 'c';
    const markovChain = new MarkovChain(inputLetters);

    const generatedWord = markovChain.generateWord(minLength, maxLength, requiredLetter);

    expect(generatedWord.length).toBeGreaterThanOrEqual(minLength);
    expect(generatedWord.length).toBeLessThanOrEqual(maxLength);
    expect(generatedWord).toContain(requiredLetter);
  });
});

describe('generateRandomWords', () => {
  test('Should create an array of words of specified length', () => {
    const inputLetters = ['a', 'b', 'c', 'd'];
    const count = 10;
    const minLength = 3;
    const maxLength = 5;

    const words = generateRandomWords(count, minLength, maxLength, inputLetters);

    expect(words.length).toBe(count);
    words.forEach((word) => {
      expect(word.length).toBeGreaterThanOrEqual(minLength);
      expect(word.length).toBeLessThanOrEqual(maxLength);
    });
  });
});

describe('getMatchingWords', () => {
  test('Should return matching words from wordList', () => {
    const inputLetters = ['a', 'b', 'c'];
    const wordList = ['abc', 'acb', 'cab', 'caab', 'bad'];
    const targetedLetter = 'c';

    const matchingWords = getMatchingWords(inputLetters, wordList, targetedLetter);

    expect(matchingWords).toEqual(['abc', 'acb', 'cab', 'caab']);
  });
});

describe('insertWordsAtRandomPositions', () => {
  test('Should insert prioritized words into random words array', () => {
    const prioritizedWords = ['cat', 'bat'];
    const randomWords = ['rat', 'hat', 'mat', 'pat'];

    const result = insertWordsAtRandomPositions(prioritizedWords, randomWords);

    expect(result.length).toBe(randomWords.length + prioritizedWords.length);
    expect(result).toEqual(expect.arrayContaining([...prioritizedWords, ...randomWords]));
  });
});

describe('generateRandomWordsWithPriority', () => {
  test('Should create an array of words with prioritized words included', () => {
    const inputLetters = ['a', 'b', 'c'];
    const count = 10;
    const minLength = 3;
    const maxLength = 5;
    const wordList = ['abc', 'acb', 'bac', 'cab', 'caab', 'bad'];

    const words = generateRandomWordsWithPriority(
      count,
      minLength,
      maxLength,
      inputLetters,
      wordList,
    );

    expect(words.length).toBe(count);
    expect(words).toEqual(expect.arrayContaining(['abc', 'acb', 'cab', 'caab']));
  });
});
