import React from 'react';
import styles from './ClosingCross.module.scss';
import { ClosingCrossProps } from './ClosingCross.props';

// Parent must be position: relative to handle cross absolute position right
function ClosingCross({ onClose, display, dark }: ClosingCrossProps) {
  return (
    <button
      style={{ display: display ? '' : 'none', color: dark ? 'black' : 'white' }}
      className={styles.closingCross}
      onClick={() => onClose(false)}
      type='button'
    >
      {/* Closing cross */}
      &#10006;
    </button>
  );
}

export default ClosingCross;
