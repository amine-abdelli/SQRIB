import React from 'react'
import { CountDown } from '../CountDown/CountDown'
import { IScoringProps } from '../CountDown/CountDown.interfaces';
import { Score } from '../Score/Score'
import { WordCount } from '../WordAccount/WordCount';
import styles from './Scoring.module.scss';

const Scoring = ({ score, startCountDown, wordCount, theme, setStartCountDown, setIsTimeOut, countDown, setCountDown }: IScoringProps) => {
  return (
    <div className={styles.scoringWrapper} style={{ color: theme?.secondary, borderBottom: `1px ${theme?.secondary} solid` }}>
      <Score score={score} />
      <CountDown
        startCountDown={startCountDown}
        setStartCountDown={setStartCountDown}
        setIsTimeOut={setIsTimeOut}
        countDown={countDown}
        setCountDown={setCountDown}
      />
      <WordCount
        wordCount={wordCount} 
      />
      <p style={{ color: 'green', margin: 0}}>{score}</p>
      <p style={{ color: 'red', margin: 0}}>{wordCount - score }</p>
      <p style={{ margin: 0}}> Précision: {(score / wordCount) ? ((score / wordCount) * 100).toFixed(2) : 0}%</p>
    </div>
  );
};

export { Scoring };
