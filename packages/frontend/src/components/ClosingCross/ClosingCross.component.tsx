import React from 'react';
import { ClosingCrossProps } from './ClosingCross.props';
import './ClosingCross.style.scss';

// Parent must be position: relative to handle cross absolute position right
function ClosingCross({ onClose, display, dark }: ClosingCrossProps) {
  return (
    <button
      style={{ display: display ? '' : 'none', color: dark ? 'black' : 'white' }}
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
