import * as fr from '../dictionnaries/fr/fr.json';
import * as en from '../dictionnaries/en/en.json';
import { GameMode } from './Mode.enum';
import { Language } from './Language.enum';

/* Generate randomly a 300 long array of words*/
function shuffleWordsStack(lang: string, mode: number) {
  let data: any;
  switch (lang) {
    case Language.FR:
      data = [...fr?.map(obj => obj.label)];
      break;
    case Language.EN:
      data = [...en?.map(obj => obj.label)];
  }
  let currentIndex = data?.length;
  let randomIndex;
  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // And swap it with the current element.
    [data[currentIndex], data[randomIndex]] = [
      data[randomIndex], data[currentIndex]];
  }
  return Array.from({ length: mode === GameMode.ONE ? 300 : 75 }, () => data[getRandomWordIndex(data.length - 1)]).map(word => word);
};

/* Return random index */
function getRandomWordIndex(range: number) {
  return Math.floor(Math.random() * range);
};

/* Split word to spans */
function splitStringToSpans(string: string, userInput: string) {
  const newString = string.split('').map((letter, i) => {
    if (i < userInput.length) {
      return (<span style={{ color: textColorOnTyping(string, userInput, i) }} key={i}>{i === 0 ? ' ' + letter : letter}</span>);
    }
    return (<span key={i}>{i === 0 ? ' ' + letter : letter}</span>);
  });
  return newString;
};

/* Save letter's position. It helps to position triangle's */
function lettersPosition(e: any, userInput: string, letter: string, i: number, setHorizontalPosition: any, setLetterWidth: any) {
  if (userInput[i] === letter) {
    setHorizontalPosition(e?.getBoundingClientRect().x);
    setLetterWidth(e?.getBoundingClientRect().width);
  }
};

/* Takes a string as parameter and split words into letters wrapped into span and store letter's position */
function spreadLetters(string: string, userInput: string, setHorizontalPosition: any, setLetterWidth: any) {
  const newString = string?.split('').map((letter, i) => {
    return (<span ref={(e: any) => lettersPosition(e, userInput, letter, i, setHorizontalPosition, setLetterWidth)} key={i}>{i === 0 ? ' ' + letter : letter}</span>);
  });
  return newString;
};

/* Color letters accordingly */
function textColorOnTyping(string: string, userInput: string, i: number) {
  if (userInput[i] === string[i]) {
    return 'green';
  } else if (!userInput) {
    return 'black';
  } else if ((userInput[i] !== string[i])) {
    return 'red';
  }
};

/* Color computed words in red or green depending on if they've been typed properly */
function setComputedWordsColor(word: string, i: number, wordIndex: number, computedWords: Array<string>) {
  if (i < wordIndex) {
    return computedWords.includes(word) ? 'green' : 'red'
  }
  return '';
};

export { shuffleWordsStack, getRandomWordIndex, splitStringToSpans, setComputedWordsColor, spreadLetters };