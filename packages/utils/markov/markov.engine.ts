import { alphabet, randomIntFromInterval } from '..';

const makeWord = require('make-word');
const _ = require('lodash');

/**
 * Define what letters that are allowed in the word
 * @param index number
 * @returns array of letters corresponding to a range given by index
 */
function getLetterRange(index: number) {
  return alphabet.slice(index, alphabet.length - 1);
}

/* Generate set of words corresponding with letter in the range set by
function getLetterRange */
function generateRandoWordInRange(index: number) {
  const start: number = Date.now();
  const wordSet: any[] = [];
  do {
    const aa = getLetterRange(index);
    const makeword = makeWord(randomIntFromInterval(3, 4), 8);
    const ii = _.intersection(aa, makeword.split(''));
    if (!ii.length) {
      wordSet.push(makeword);
    }
  } while (wordSet.length < 10000);
  console.log('Markov function executed within:', (Date.now() - start) > 1000 ? `${(Date.now() - start) / 1000}sec` : `${(Date.now() - start)}ms`);
  return wordSet;
}

/* Generate a set of word in function of the alphabet index given */
function markovChainGenerator(i: number) {
  console.log('Starting Markov function...');
  const wordSet = generateRandoWordInRange(i);
  console.log('Starting to filter word set according to letter provided...', alphabet[i]);
  const STACK: string[] = [];
  wordSet.forEach((word) => {
    if (word.includes(alphabet[i - 1])) {
      STACK.push(word);
    }
  });
  return STACK;
}

export { markovChainGenerator };
