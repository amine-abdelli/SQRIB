import React from 'react';
import styles from './Score.module.scss';

const Score = ({score}: { score: number }) => {
  return (
    <div className={styles.scoreWrapper}>
      Score: {score}
    </div>
  )
}

export { Score };
