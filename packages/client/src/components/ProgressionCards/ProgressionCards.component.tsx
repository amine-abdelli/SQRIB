import React from 'react';
import { alphabet } from '@aqac/utils';
import Letter from '../Letter/Letter.component';

function ProgressionCards({ level = 5 }: { level: number }) {
  return (
    <>
      {alphabet.map(
        (letter, i) => (
          <span key={letter}>
            <Letter
              isFocused={i === level}
              isGreen={i <= level}
              letter={letter}
            />
          </span>
        ),
      )}
    </>
  );
}

export default ProgressionCards;
