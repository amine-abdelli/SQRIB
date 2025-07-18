import { Icon } from '@blueprintjs/core';
import React from 'react';
import { theme } from '../../../../styles/theme';
import { ICursorProps } from './Cursor.props';

function Cursor({ horizontalPosition, letterWidth }: ICursorProps) {
  return (
    <p style={{
      transition: 'all 0.2s ease', position: 'absolute', left: horizontalPosition + (letterWidth / 2) - 10, display: horizontalPosition ? 'block' : 'none', transform: 'translateY(-40px)',
    }}
    >
      <Icon
        size={24}
        color={theme?.primary}
        icon="symbol-triangle-up"
      />
    </p>
  );
}

export default Cursor;
