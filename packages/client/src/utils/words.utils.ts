import { Dispatch, SetStateAction } from 'react';
import { Colors } from './enums';

/* Color letters accordingly. Green if correct, red if wrong, black if not computed */
function textColorOnTyping(string: string, userInput: string, i: number) {
  if (userInput[i] === string[i]) {
    return Colors.BLACK;
  } if (!userInput) {
    return Colors.GREY;
  } if ((userInput[i] !== string[i])) {
    return Colors.RED;
  }
  return Colors.GREY;
}

/* Color computed words in red or green depending on if they've been typed properly */
function setComputedWordsColor(
  i: number,
  wordIndex: number,
  computedWords: string[],
  correctWords: Array<string>,
) {
  if (i < wordIndex) {
    return computedWords[i] === correctWords[i] ? Colors.GREEN : Colors.RED;
  }
  return '';
}

/* Save letter's position. It helps to position triangle */
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

export { textColorOnTyping, lettersPosition, setComputedWordsColor };
