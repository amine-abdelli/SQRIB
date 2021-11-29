import React, { useContext, useEffect, useState } from 'react';
import { roundNumber } from '@aqac/utils';
import { MainContext } from '../../contexts/MainContext';
import { Colors } from '../../helpers/enums/Colors.enum';
import { CountDown } from '../CountDown/CountDown';
import Modal from '../Modal/Modal';
import Stats from '../Modal/Stats';
import ScoringItem from './ScoringItem';
import styles from './Scoring.module.scss';

function Scoring() {
  const {
    wordCount, isTimeOut, computedWords, theme, correctWords,
  } = useContext(MainContext);
  const [showStatsModal, setShowStatsModal] = useState(isTimeOut);

  useEffect(() => {
    setShowStatsModal(isTimeOut);
  }, [isTimeOut]);

  const wrongWords = computedWords.length - correctWords.length;
  const correctLetters = correctWords.join('').length + correctWords.length;
  const totalLetters = computedWords.join('').length + correctWords.length;
  const wrongLetters = totalLetters - correctLetters;
  const precision = roundNumber((correctLetters / totalLetters) * 100, 0) || 0;
  const wordPerMinute = correctLetters / 5;

  return (
    <>
      <div className={styles.scoringWrapper} style={{ color: theme?.secondary, borderBottom: `1px ${theme?.secondary} solid` }}>
        <CountDown />
        <ScoringItem content={`Count ${wordCount}`} />
        <ScoringItem content={`+${correctWords.length}`} color={Colors.GREEN} />
        <ScoringItem content={`-${wrongWords}`} color={Colors.RED} />
        <ScoringItem content={`Précision: ${roundNumber((correctLetters / totalLetters) * 100, 0) || '0'}%`} />
        <ScoringItem content={`Mpm: ${roundNumber(wordPerMinute, 0)}`} />
        <ScoringItem content={`+${correctLetters}`} color={Colors.GREEN} />
        <ScoringItem content={`-${wrongLetters}`} color={Colors.RED} />
        <ScoringItem content={`Points: ${roundNumber(correctLetters * (precision / 100), 0)}`} color={Colors.GREEN} />
      </div>
      <Modal
        showModeSelection={showStatsModal}
        setShowModeSelection={setShowStatsModal}
        content={(
          <Stats
            malus={wrongWords}
            points={correctWords.length}
            precision={precision}
            wordCount={wordCount}
          />
        )}
      />
    </>
  );
}

export { Scoring };
