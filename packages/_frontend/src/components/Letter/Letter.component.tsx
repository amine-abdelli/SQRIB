import React from 'react';
import style from './Letter.module.scss';

function Letter(
  { letter, isGreen, isFocused }: { letter: string, isGreen: boolean, isFocused: boolean },
) {
  return (
    <span
      className={isGreen ? style.passedLetter : style.letter}
      style={{
        transform: isFocused ? 'scale(1.4)' : '',
      }}
    >
      {letter}
    </span>
  );
}

export default Letter;
