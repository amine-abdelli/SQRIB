import React from 'react';
import { ChevronUp } from 'react-iconly';
import { ICursorProps } from './Cursor.props';
import { COLORS } from '../../../theme/colors';

function Cursor({ horizontalPosition, letterWidth }: ICursorProps) {
  return (
    <p style={{
      transition: 'all 0.2s ease',
      position: 'absolute',
      left: horizontalPosition + (letterWidth / 2) - 25,
      display: horizontalPosition ? 'block' : 'none',
      transform: 'translateY(-10px)',
    }}
    >
      <ChevronUp set="bold" size="xlarge" primaryColor={COLORS.GOLD}/>
    </p>
  );
}

export { Cursor };
