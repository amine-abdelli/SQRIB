import React from 'react';
import { ProgressBarProps } from './ProgressBar.props';
import styles from './ProgressBar.style.scss';

function ProgressBar({
  key, completed, color, style,
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
        height: '1rem',
        backgroundColor: 'lightgrey',
        margin: '5px',
        borderRadius: '10px',
        color: 'white',
        fontWeight: 'bold',
      }}
    >
      <div style={{
        height: '100%',
        width: `${progressWithMax}%`,
        backgroundColor: color,
        borderRadius: '10px',
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
