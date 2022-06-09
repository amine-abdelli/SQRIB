import React from 'react';
import style from './Letter.module.scss';

function Letter(
  { letter, isGreen, isFocused }: { letter: string, isGreen: boolean, isFocused: boolean },
) {
  return (
    <span
      className={style.letter}
      style={{
        backgroundColor: isGreen ? 'green' : 'inherit',
        color: isGreen ? '#dfdad2' : '',
        transform: isFocused ? 'scale(1.4)' : '',
      }}
    >
      {letter}
    </span>
  );
}

export default Letter;
