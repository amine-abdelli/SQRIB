import React, { useContext, useEffect, useState } from 'react';
import { roundNumber } from '@aqac/utils';
import { MainContext } from '../../context/MainContext';
import { Colors } from '../../utils/enums/Colors.enum';
import { CountDown } from '../CountDown/CountDown.component';
import Modal from '../Modal/Modal.component';
import Stats from '../Stats/Stats.component';
import ScoringItem from './ScoringItem/ScoringItem.component';
import styles from './Scoring.module.scss';

function Scoring() {
  const {
    wordCount, isTimeOut, computedWords, theme, correctWords, gameMode,
  } = useContext(MainContext);
  const [showStatsModal, setShowStatsModal] = useState(isTimeOut);

  useEffect(() => {
    setShowStatsModal(isTimeOut);
  }, [isTimeOut]);

  const wrongWords: number = computedWords.length - correctWords.length;
  const correctLetters: number = correctWords.join('').length + correctWords.length;
  const totalLetters: number = computedWords.join('').length + correctWords.length;
  const wrongLetters: number = totalLetters - correctLetters;
  const precision: number = roundNumber((correctLetters / totalLetters) * 100, 0) || 0;
  const wordPerMinute: number = correctLetters / 5;
  const points: number = roundNumber(correctLetters * (precision / 100), 0);
  const mpm: number = roundNumber(wordPerMinute, 0);

  const statProps = {
    correctWords,
    wrongWords,
    correctLetters,
    totalLetters,
    wrongLetters,
    precision,
    points,
    mpm,
    wordCount,
  };

  return (
    <>
      <div className={styles.scoringWrapper} style={{ color: theme?.secondary, borderBottom: `1px ${theme?.secondary} solid` }}>
        <CountDown />
        <ScoringItem content={`Count ${wordCount}`} color={theme.secondary} />
        <ScoringItem content={`+${correctWords.length}`} color={Colors.GREEN} />
        <ScoringItem content={`-${wrongWords}`} color={Colors.RED} />
        <ScoringItem content={`Précision: ${precision}%`} color={theme.secondary} />
        <ScoringItem content={`Mpm: ${mpm}`} color={theme.secondary} />
        <ScoringItem content={`+${correctLetters}`} color={Colors.GREEN} />
        <ScoringItem content={`-${wrongLetters}`} color={Colors.RED} />
        <ScoringItem content={`Points: ${points}`} color={Colors.GREEN} />
      </div>
      <Modal
        className={styles.statsModal}
        showModeSelection={showStatsModal}
        setShowModeSelection={setShowStatsModal}
        content={(
          <Stats {...statProps} />
        )}
      />
    </>
  );
}

export { Scoring };
