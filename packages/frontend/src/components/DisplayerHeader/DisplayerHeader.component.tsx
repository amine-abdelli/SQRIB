import React, { Dispatch, SetStateAction } from 'react';
import { Cursor } from './Cursor/Cursor.component';
import { EngineProps } from '../../modules/Training/Engine';
import { getFocusedWordLetterColor } from '../../utils/typing.utils';
import { useWindowSize } from '../../hooks';
import './WordsCollectionHeader.style.scss';

/* Save letter's position. It helps to position triangle */
function lettersPosition(
  e: any,
  userInput: string,
  i: number,
  setHorizontalPosition: Dispatch<SetStateAction<number>>,
  setLetterWidth: Dispatch<SetStateAction<number>>,
) {
  if (userInput[i]) {
    setHorizontalPosition(e?.getBoundingClientRect().x);
    setLetterWidth(e?.getBoundingClientRect().width);
  }
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
        i,
        setHorizontalPosition,
        setLetterWidth,
      )}
      key={`${i + letter}`}
      style={{ color: getFocusedWordLetterColor(letter, userInput.split('')?.[i], i, userInput.length) }}
    >
      {i === 0 ? `${letter}` : letter}
    </span>
  ));
  return newString;
}

function WordsCollectionHeader({
  wordChain,
  indexOfProgression,
  input,
}: EngineProps) {
  const [horizontalPosition, setHorizontalPosition] = React.useState<number>(0);
  const [letterWidth, setLetterWidth] = React.useState<number>(0);
  const { isMediumScreen } = useWindowSize()
  const size = isMediumScreen ? 40 : 60;
  return (
    <div className="words-collections-header--wrapper">
      <p
        className="words-collections-header"
        style={{ fontSize: `${size}px` }}
      >
        {spreadLetters(
          wordChain[indexOfProgression],
          input,
          setHorizontalPosition,
          setLetterWidth,
        )}
      </p>
      {horizontalPosition && letterWidth ? (
        <Cursor
          horizontalPosition={horizontalPosition}
          letterWidth={letterWidth}
        />
      ) : ''}
    </div>
  );
}

export { WordsCollectionHeader };
