import React, { useEffect, useState } from 'react';
import { Tooltip } from '@nextui-org/react';
import { Colors } from '../../utils/enums/Colors.enum';
import { CountDown } from '../CountDown/CountDown.component';
import Modal from '../Modal/Modal.component';
import Stats from '../Stats/Stats.component';
import ScoringItem from './ScoringItem/ScoringItem.component';
import styles from './Scoring.module.scss';
import useSpeedCalculator from '../../hooks/useSpeedCalculator';

function Scoring({
  isTimeOut, computedWords,
  correctWords, mpm, wrongWords,
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
      <div className={styles.scoringWrapper} style={{ borderBottom: '1px solid' }}>
        <CountDown />
        <Tooltip hideArrow content='Vitesse moyenne de frappe'>
          <ScoringItem content={`${!isTimeOut ? typingSpeed : 0} m/min`} />
        </Tooltip>
        <ScoringItem content={`${computedWords.length} mots saisies`} />
        <Tooltip hideArrow content='(nombre de lettre saisies correctement / nombre de lettre total) x 100'>
          <ScoringItem content={`Précision: ${precision}%`} />
        </Tooltip>
        <Tooltip
          hideArrow
          content={<a href='https://fr.wikipedia.org/wiki/Mot_par_minute' target='_blank' rel="noreferrer">Mot par minute</a>}
          color='default'
        >
          <ScoringItem content={`Mpm: ${mpm}`} />
        </Tooltip>
        <Tooltip
          hideArrow
          content='nombre de lettres correctement saisies x (précision / 100)'
        >
          <ScoringItem content={`Points: ${points}`} color={Colors.GREEN} />
        </Tooltip>
      </div>
      <Modal
        className={styles.statsModal}
        closable
        isVisible={showStatsModal}
        setIsVisible={() => null}
        content={(
          <Stats {...statProps} />
        )}
      />
    </>
  );
}

export { Scoring };
