import React from 'react';
import { theme } from '../../../styles/theme';
import { ProgressBarProps } from './ProgressBar.props';
import styles from './ProgressBar.style.scss';

function ProgressBar({
  key, completed, color, style, focus,
}: ProgressBarProps) {
  // Math.min is used to prevent the progress bar from going over 100%
  const progressWithMax = Math.min(completed, 100);
  return (
    <div
      className={styles.progressBarWrapper}
      key={key}
      style={{
        ...style,
        position: 'relative',
        height: '1.3rem',
        backgroundColor: 'lightGrey',
        boxShadow: `3px 3px 0px ${focus ? theme.primary : theme.outline}`,
        border: `3px solid ${focus ? theme.primary : theme.outline}`,
        color: 'white',
        fontWeight: 'bold',
      }}
    >
      <div style={{
        height: '100%',
        width: `${progressWithMax}%`,
        backgroundColor: color,
        top: 0,
        left: 0,
        bottom: 0,
      }}
      />
      <div>
        <span style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        >
          {`${Math.trunc(progressWithMax)}%`}
        </span>
      </div>
    </div>
  );
}

export default ProgressBar;
