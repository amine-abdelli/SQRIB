import { Icon } from '@blueprintjs/core';
import React from 'react';
import { ICursorProps } from './Cursor.props';

const Cursor = function ({ horizontalPosition, letterWidth, theme }: ICursorProps) {
  return (
    <p style={{
      transition: 'all 0.2s ease', position: 'absolute', left: horizontalPosition + (letterWidth / 2) - 8.5, display: horizontalPosition ? 'block' : 'none', transform: 'translateY(-25px)',
    }}
    >
      <Icon color={theme?.tertiary} icon="symbol-triangle-up" />
    </p>
  );
};

export default Cursor;
