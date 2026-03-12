import { Dispatch, SetStateAction } from 'react';
import { lettersPosition, textColorOnTyping } from './words.utils';

export const specialCharacterRegex = /[^\w\s]/gi;

/* Split word to spans */
function splitStringToSpans(stringToCompare: string, userInput: string) {
  const newString = stringToCompare?.split('').map((letter: string, i: number) => {
    if (i < userInput.length) {
      return (
        <span
          key={`${letter + i}`}
          style={{
            margin: 0, padding: 0, display: 'inline', color: textColorOnTyping(stringToCompare, userInput, i),
          }}
        >
          {i === 0 ? `${letter}` : letter}
        </span>
      );
    }
    return (<span style={{ margin: 0, padding: 0, display: 'inline' }} key={`${letter + i}`}>{i === 0 ? `${letter}` : letter}</span>);
  });
  return (
    <span style={{ margin: 0, padding: 0, display: 'inline' }}>
      {newString}
    </span>
  );
}

/* Takes a string as parameter and split words into letters wrapped into span
and store letter's position */
function spreadLetters(
  string: string,
  userInput: string,
  setHorizontalPosition: Dispatch<SetStateAction<number>>,
  setLetterWidth: Dispatch<SetStateAction<number>>,
) {
  const newString: any = string?.split('').map((letter: string, i: number) => (
    <span
      ref={(e: any) => lettersPosition(
        e,
        userInput,
        letter,
        i,
        setHorizontalPosition,
        setLetterWidth,
      )}
      key={`${i + letter}`}
    >
      {i === 0 ? `${letter}` : letter}
    </span>
  ));
  return newString;
}

export {
  splitStringToSpans, spreadLetters,
};
