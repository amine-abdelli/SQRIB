import React, { useEffect, useState } from 'react';
import { Tooltip } from '@nextui-org/react';
import { CountDown } from '../CountDown/CountDown.component';
import Modal from '../../UI/Modal/Modal.component';
import Stats from '../Stats/Stats.component';
import ScoringItem from './ScoringItem/ScoringItem.component';
import styles from './Scoring.module.scss';
import useSpeedCalculator from '../../hooks/useSpeedCalculator';
import { useWindowSize } from '../../hooks/useWindowSize';
import { useGetSelf } from '../../hooks/useGetSelf';
import Avatar from '../../UI/Avatar/Avatar.component';
import Spacer from '../../UI/Spacer/Spacer.component';

function Scoring({
  isTimeOut, computedWords,
  correctWords, mpm, wrongWords,
  points, precision, wrongLetters, totalLetters, correctLetters, scores,
  onSetFinish, startTimer,
}: any) {
  const [typingSpeed] = useSpeedCalculator(correctWords, startTimer, isTimeOut);
  const [showStatsModal, setShowStatsModal] = useState(isTimeOut);
  const { data: selfData } = useGetSelf();
  const nickname = selfData?.self.nickname;
  const { isSmallScreen, isLargeScreen, isVerySmallScreen } = useWindowSize();

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
    scores,
    onSetFinish,
    setShowStatsModal,
    typingSpeed,
  };

  return (
    <>
      <div className={styles.scoringWrapper} style={{ position: 'relative' }}>
        <Avatar username={nickname} size='small' />
        <Spacer w="20" />
        {!isLargeScreen && (
          <>
            <Tooltip hideArrow content='Vitesse moyenne de frappe'>
              <ScoringItem content={`${!isTimeOut ? typingSpeed : 0} m/min`} />
            </Tooltip>
            <Spacer w="20" />
          </>
        )}
        {!isSmallScreen && (
        <ScoringItem content={`Mots saisies : ${computedWords.length}`} />
        )}
        <Spacer w="20" />
        {!isVerySmallScreen && (
        <>
          <Tooltip hideArrow content='(nombre de lettre saisies correctement / nombre de lettre total) x 100'>
            <ScoringItem content={`Précision : ${precision}%`} />
          </Tooltip>
          <Spacer w="20" />
        </>
        )}
        <Tooltip
          hideArrow
          content={<a href='https://fr.wikipedia.org/wiki/Mot_par_minute' target='_blank' rel="noreferrer">Mot par minute</a>}
          color='default'
        >
          <ScoringItem content={`Mpm : ${mpm}`} />
        </Tooltip>
        <Spacer w="20" />
        {!isLargeScreen && (
        <Tooltip
          hideArrow
          content='nombre de lettres correctement saisies x (précision / 100)'
        >
          <ScoringItem content={`Points : ${points}`} />
        </Tooltip>
        )}
        <Spacer w="10" />
        <CountDown />
      </div>
      <Modal
        closeable
        darkCross
        isOpen={showStatsModal}
        setIsOpen={() => setShowStatsModal(false)}
      >
        <Modal.Body>
          <Stats {...statProps} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export { Scoring };
