import _ from 'lodash';
import fr from '../dictionnaries/fr/fr.json';
import en from '../dictionnaries/en/en.json';
import de from '../dictionnaries/de/de.json';
import es from '../dictionnaries/es/es.json';

const dictionnary_fr: string[] = fr?.map(({ label }) => label);
const dictionnary_en: string[] = en?.map(({ label }) => label);
const dictionnary_de: string[] = de?.map(({ label }) => label);
const dictionnary_es: string[] = es?.map(({ label }) => label);

export const specialCharacterRegex: RegExp = /[^\w\s]/gi;

/**
 * Shuffle words in a set
 * @param array Array of words to shuffle
 * @param setLength defined word length
 * @returns Shuffled array of words
 */
function shuffleWordSet(array: string[], setLength: number) {
  return _.shuffle(array).slice(0, setLength);
}

/**
 * Allocate a ratio of easy, medium and hard words to the word set.
 * e.g. 67% of words are easy, 28% are medium and about 5% are hard.
 * @param array Array of words
 * @returns a set of words composed of easy, medium and hard words
 */
function setGenerator(array: string[]): any {
  const easy: string[] = array.filter((
    word: string,
  ) => word.length <= 5 && !word.match(specialCharacterRegex));
  const medium: string[] = array.filter((
    word: string,
  ) => word.length <= 10 && !word.match(specialCharacterRegex));
  const hard: string[] = array.filter((word: string) => word.length > 5);

  const easySet: string[] = shuffleWordSet(easy, 270); // No accent <= 5
  const mediumSet: string[] = shuffleWordSet(medium, 104); // less 5 word with accent per set
  const hardSet: string[] = shuffleWordSet(hard, 26); // More than 5 character with accent
  return [...easySet, ...mediumSet, ...hardSet];
}

/**
 * Generate a word set with a defined length and language
 * @param lang Chosen language
 * @param wordSetLength Word set length
 * @returns An array of words of the specified length in the specified language
 */
export function generateWordSet(lang: string, wordSetLength: number) {
  switch (lang) {
    case 'fr':
      return shuffleWordSet(setGenerator(dictionnary_fr), wordSetLength);
    case 'en':
      return shuffleWordSet(setGenerator(dictionnary_en), wordSetLength);
    case 'de':
      return shuffleWordSet(setGenerator(dictionnary_de), wordSetLength);
    case 'es':
      return shuffleWordSet(setGenerator(dictionnary_es), wordSetLength);
    default: shuffleWordSet(setGenerator(dictionnary_fr), wordSetLength);
  }
  return [];
}
