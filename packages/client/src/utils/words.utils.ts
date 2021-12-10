import { Dispatch, SetStateAction } from 'react';
import { Colors } from './enums';

/* Color letters accordingly */
function textColorOnTyping(string: string, userInput: string, i: number) {
  if (userInput[i] === string[i]) {
    return Colors.GREEN;
  } if (!userInput) {
    return Colors.BLACK;
  } if ((userInput[i] !== string[i])) {
    return Colors.RED;
  }
  return Colors.BLACK;
}

/* Color computed words in red or green depending on if they've been typed properly */
function setComputedWordsColor(
  word: string,
  i: number,
  wordIndex: number,
  correctWords: Array<string>,
) {
  if (i < wordIndex) {
    return correctWords.includes(word) ? Colors.GREEN : Colors.RED;
  }
  return '';
}

/* Save letter's position. It helps to position triangle's */
function lettersPosition(
  e: any,
  userInput: string,
  letter: string,
  i: number,
  setHorizontalPosition: Dispatch<SetStateAction<number>>,
  setLetterWidth: Dispatch<SetStateAction<number>>,
) {
  if (userInput[i] === letter) {
    setHorizontalPosition(e?.getBoundingClientRect().x);
    setLetterWidth(e?.getBoundingClientRect().width);
  }
}

export { textColorOnTyping, setComputedWordsColor, lettersPosition };
