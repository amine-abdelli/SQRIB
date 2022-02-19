import React, { useEffect, useState } from 'react';
import { Colors } from '../../utils/enums/Colors.enum';
import { CountDown } from '../CountDown/CountDown.component';
import Modal from '../Modal/Modal.component';
import Stats from '../Stats/Stats.component';
import ScoringItem from './ScoringItem/ScoringItem.component';
import styles from './Scoring.module.scss';
import useSpeedCalculator from '../../hooks/useSpeedCalculator';

function Scoring({
  isTimeOut, computedWords,
  theme, correctWords, mpm, wrongWords,
  gameMode, points, precision, wrongLetters, totalLetters, correctLetters, timing, scores,
  onSetFinish, startTimer,
}: any) {
  const [typingSpeed] = useSpeedCalculator(correctWords, startTimer, isTimeOut);
  const [showStatsModal, setShowStatsModal] = useState(isTimeOut);

  useEffect(() => {
    setShowStatsModal(isTimeOut);
  }, [isTimeOut]);

  const statProps = {
    correctWords,
    wrongWords,
    correctLetters,
    totalLetters,
    wrongLetters,
    precision,
    points,
    mpm,
    computedWords,
    gameMode,
    timing,
    scores,
    onSetFinish,
    setShowStatsModal,
    typingSpeed,
  };

  return (
    <>
      <div className={styles.scoringWrapper} style={{ color: theme?.secondary, borderBottom: `1px ${theme?.secondary} solid` }}>
        <CountDown />
        <ScoringItem content={`${!isTimeOut ? typingSpeed : 0}mpm`} />
        <ScoringItem content={`Count ${computedWords.length}`} color={theme.secondary} />
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
        setShowModeSelection={() => null}
        content={(
          <Stats {...statProps} />
        )}
      />
    </>
  );
}

export { Scoring };
