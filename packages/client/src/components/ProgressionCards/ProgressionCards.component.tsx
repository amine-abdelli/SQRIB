import React from 'react';
import { alphabet } from '@aqac/utils';
import Letter from '../Letter/Letter.component';
import { useWindowSize } from '../../hooks/useWindowSize';

function ProgressionCards({ level = 5 }: { level: number }) {
  const { isMediumScreen } = useWindowSize();
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', width: '100%', marginRight: '1rem',
    }}
    >
      {alphabet.map(
        (letter, i) => (
          !isMediumScreen ? (
            <span key={letter}>
              <Letter
                isFocused={i === level}
                isGreen={i <= level}
                letter={letter}
              />
            </span>
          ) : (
            (i > level - 4 && i < level + 4) && (
              <span key={letter}>
                <Letter
                  isFocused={i === level}
                  isGreen={i <= level}
                  letter={letter}
                />
              </span>
            )
          )
        ),
      )}
    </div>
  );
}

export default ProgressionCards;
