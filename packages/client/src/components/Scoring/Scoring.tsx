import React, { useContext, useEffect, useState } from 'react'
import { MainContext } from '../../../pages/Main/MainContext';
import { CountDown } from '../CountDown/CountDown'
import { IScoringProps } from '../CountDown/CountDown.interfaces';
import Modal from '../ModeSelectionModal/Modal';
import Stats from '../ModeSelectionModal/Stats';
import { Score } from '../Score/Score'
import { WordCount } from '../WordAccount/WordCount';
import styles from './Scoring.module.scss';

const Scoring = ({ score, theme }: IScoringProps | any) => {
  const { wordCount, isTimeOut } = useContext(MainContext);
  const [showStatsModal, setShowStatsModal] = useState(isTimeOut);
  useEffect(() => {
    setShowStatsModal(isTimeOut)
  }, [isTimeOut])
  const points = score;
  const malus = wordCount - score;
  const precision = (score / wordCount) ? ((score / wordCount) * 100).toFixed(2) : 0;
  return (
    <>
      <div className={styles.scoringWrapper} style={{ color: theme?.secondary, borderBottom: `1px ${theme?.secondary} solid` }}>
        <Score score={score} />
        <CountDown />
        <WordCount />
        <p style={{ color: 'green', margin: 0 }}>{points}</p>
        <p style={{ color: 'red', margin: 0 }}>{malus}</p>
        <p style={{ margin: 0 }}> Précision: {precision}%</p>
      </div>
      <Modal
        showModeSelection={showStatsModal}
        setShowModeSelection={setShowStatsModal}
        content={<Stats malus={malus} points={points}
          precision={precision}
          wordCount={wordCount} />
        } />

    </>
  );
};

export { Scoring };
