import React, { useContext } from 'react';
import Image from 'next/image';
import { Button, Divider } from '@blueprintjs/core';
import { topValue } from '@aqac/utils';
import { Colors } from '../../utils/enums';
import { IStats } from './Stats.props';
import styles from './Stats.module.scss';
import ScoreCard from '../ScoreCard/ScoreCard.component';
import Success from '../../assets/Images/success.png';
import star from '../../assets/Images/star.png';
import { useGetSelf } from '../../hooks/useGetSelf';
import { MainContext } from '../../context/MainContext';

function Stats({
  wrongWords,
  computedWords,
  correctWords,
  correctLetters,
  totalLetters,
  wrongLetters,
  precision,
  points,
  mpm,
  onSetFinish,
  gameMode,
  setShowStatsModal,
}: IStats) {
  const { onRestart } = useContext(MainContext);
  const { scores, isLoggedIn } = useGetSelf();
  const isBestScore = mpm > topValue(scores, 'mpm') && scores?.length > 0;
  const isFirstScore = scores?.length === 0;
  const isNotParticular = !isFirstScore && !isBestScore;
  function submitScoreAndRestart() {
    if (isLoggedIn) {
      onSetFinish(
        mpm,
        wrongWords,
        gameMode,
        points,
        precision,
        wrongLetters,
        totalLetters,
        correctLetters,
      );
    }
    onRestart();
    setShowStatsModal(false);
  }
  return (
    <div className={styles.statsWrapper}>
      <div style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column',
      }}
      >
        {isBestScore && <h1 style={{ textAlign: 'center' }}>MEILLEUR SCORE</h1>}
        {isBestScore && <h4 style={{ textAlign: 'center' }}>FELICITATION</h4>}
        {isFirstScore && <h1 style={{ textAlign: 'center' }}>TON PREMIER SCORE</h1>}
        {(isNotParticular || !isLoggedIn) && <h1 style={{ textAlign: 'center' }}>NOUVEAU SCORE</h1>}

        <Image
          src={isBestScore || isFirstScore ? Success : star}
          alt="Picture of the author"
          quality={100}
          layout='fixed'
          width='135px'
          height='135px'
        />
      </div>
      <div className={styles.statsContent}>
        <div style={{
          display: 'flex', justifyContent: 'center', flexDirection: 'column', flexBasis: '100%',
        }}
        >
          <h1 className={styles.mpm}>
            {`${mpm} mpm`}
          </h1>
          <p className={styles.mpmTranslation}>(mot par minute)</p>
          <h3 style={{ color: Colors.GREEN, textAlign: 'center' }}>
            {`${points} points`}
          </h3>
        </div>
        <Divider />
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <ScoreCard content={computedWords.length} title="Mots saisies" stat />
          <Divider />
          <ScoreCard content={wrongWords} title="Mots incorrects" malus stat />
          <Divider />
          <ScoreCard content={correctWords.length} title="Mots corrects" bonus stat />
        </div>
        <Divider />
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <ScoreCard content={totalLetters} title="Total lettres" stat />
          <Divider />
          <ScoreCard content={wrongLetters} title="Lettres incorrectes" malus stat />
          <Divider />
          <ScoreCard content={correctLetters} title="Lettres corrects" bonus stat />
        </div>
        <Divider />
        <ScoreCard content={`${precision}%`} title="Précision" stat />
        <Button
          intent='success'
          onClick={submitScoreAndRestart}
          style={{
            backgroundColor: 'orange', color: 'white', width: '100%', marginTop: '5px',
          }}
        >
          CONTINUER
        </Button>
      </div>
    </div>
  );
}

export default Stats;
