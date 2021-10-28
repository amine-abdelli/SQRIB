import React from 'react';
import styles from './WordCount.module.scss';

const WordCount = ({wordCount}: { wordCount: number }) => {
  return (
    <div className={styles.wordCount}>
      Count: {wordCount}
    </div>
  )
}

export { WordCount };
