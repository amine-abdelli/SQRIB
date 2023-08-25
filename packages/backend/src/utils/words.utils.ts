import { TLanguages, dictionaries } from '@sqrib/shared';
import _ from 'lodash';

export const specialCharacterRegex: RegExp = /[^\w\s]/gi;

/**
 * Shuffle words in a set
 * @param array Array of words to shuffle
 * @param wordCount defined word length
 * @returns Shuffled array of words
 */
function shuffle(array: string[], wordCount: number) {
  return _.shuffle(array).slice(0, wordCount);
}

/**
 * Allocate a ratio of easy, medium and hard words to the word set.
 * e.g. 67% of words are easy, 28% are medium and about 5% are hard.
 * @param array Array of words
 * @returns a set of words composed of easy, medium and hard words
 */
function generateWordChain(array: string[], wordCount: number): string[] {
  const easy: string[] = array.filter((
    word: string,
  ) => word.length <= 5 && !specialCharacterRegex.test(word));
  const medium: string[] = array.filter((
    word: string,
  ) => word.length <= 10 && !specialCharacterRegex.test(word));
  const hard: string[] = array.filter(
    (word: string) => word.length > 5 && specialCharacterRegex.test(word),
  );

  // No accent <= 5
  const easySet: string[] = shuffle(easy, wordCount * 0.70);
  // Less than 10 letters with accent/word
  const mediumSet: string[] = shuffle(medium, wordCount * 0.25);
  // At least 5 character with accent
  const hardSet: string[] = shuffle(hard, wordCount * 0.10);
  return [...easySet, ...mediumSet, ...hardSet];
}

/**
 * Generate a word set with a defined length and language
 * @param lang Chosen language
 * @param wordCount The number of word in one set of word
 * @returns An array of words of the specified length in the specified language
 */
export function generateWordSet(lang: TLanguages, wordCount: number) {
  return shuffle(generateWordChain(dictionaries[lang], wordCount), wordCount);
}
