import React from 'react';
import { IWordCountProps } from '../CountDown/CountDown.interfaces';
import styles from './WordCount.module.scss';



const WordCount = ({wordCount}: IWordCountProps) => {
  return (
    <div className={styles.wordCount}>
      Count: {wordCount}
    </div>
  )
}

export { WordCount };
