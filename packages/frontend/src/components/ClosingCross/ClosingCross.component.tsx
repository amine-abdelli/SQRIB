import React from 'react';
import { ClosingCrossProps } from './ClosingCross.props';
import './ClosingCross.style.scss';
import { COLORS } from '../../theme/colors';

// Parent must be position: relative to handle cross absolute position right
function ClosingCross({ onClose, display, dark, fixed }: ClosingCrossProps) {
  return (
    <button
      style={{ position: fixed ? 'inherit' : 'absolute', display: display ? '' : 'none', color: dark ? 'black' : COLORS.WHITE }}
      className="closing-cross"
      onClick={() => onClose(false)}
      type='button'
    >
      {/* Closing cross */}
      &#10006;
    </button>
  );
}

export { ClosingCross };
