import React, { useContext } from 'react';
import { MainContext } from '../../../pages/Main/MainContext';
import { IWordCountProps } from '../CountDown/CountDown.interfaces';
import styles from './WordCount.module.scss';



const WordCount = () => {
  const { wordCount } = useContext(MainContext)
  return (
    <div className={styles.wordCount}>
      Count: {wordCount}
    </div>
  )
}

export { WordCount };
