import React, { useContext, useState } from 'react';
import Image from 'next/image';
import { Divider } from '@blueprintjs/core';
import {
  Button, Modal, Text, Tooltip,
} from '@nextui-org/react';
import { topValue } from '@aqac/utils';
import { InfoCircle } from 'react-iconly';
import { Colors } from '../../utils/enums';
import { IStats } from './Stats.props';
import styles from './Stats.module.scss';
import ScoreCard from '../ScoreCard/ScoreCard.component';
import Success from '../../assets/Images/success.png';
import star from '../../assets/Images/star.png';
import { useGetSelf } from '../../hooks/useGetSelf';
import { MainContext } from '../../context/MainContext';
import Signup from '../Signup/Signup.component';

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
  setShowStatsModal,
  typingSpeed,
}: IStats) {
  const { scores, isLoggedIn } = useGetSelf();
  const { onRestart } = useContext(MainContext);
  const [shouldOpenSignup, setShouldOpenSignup] = useState(false);
  const isBestScore = mpm > topValue(scores, 'mpm') && scores?.length > 0;
  const isFirstScore = scores?.length === 0;
  const isNotParticular = !isFirstScore && !isBestScore;
  function submitScoreAndRestart() {
    if (isLoggedIn) {
      onSetFinish(
        mpm,
        wrongWords,
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
        {isBestScore && <Text style={{ textAlign: 'center' }}>MEILLEUR SCORE</Text>}
        {isBestScore && <h4 style={{ textAlign: 'center' }}>FELICITATION</h4>}
        {isFirstScore && <Text style={{ textAlign: 'center' }}>TON PREMIER SCORE</Text>}
        {(isNotParticular || !isLoggedIn) && <Text h2 style={{ textAlign: 'center' }}>NOUVEAU SCORE</Text>}
        <Image
          src={isBestScore || isFirstScore ? Success : star}
          alt="Picture of the author"
          quality={100}
          layout='fixed'
          width='100px'
          height='100px'
        />
      </div>
      <div className={styles.statsContent}>
        <div
          className='flex justify-center flex-column'
          style={{
            flexBasis: '100%', alignItems: 'center',
          }}
        >
          <span className='flex align-center'>
            <Text h2 className={styles.mpm}>
              {`${mpm} mpm`}
            </Text>
            <Tooltip
              hideArrow
              content={<a style={{ color: 'black' }} href='https://fr.wikipedia.org/wiki/Mot_par_minute' target='_blank' rel="noreferrer">Mot par minute</a>}
              color='default'
            >
              <InfoCircle set='light' primaryColor='grey' />
            </Tooltip>
          </span>
          <Text h4 style={{ color: Colors.GREEN, textAlign: 'center' }}>
            {`${points} points`}
          </Text>
        </div>
        <Divider />
        <div className={styles.scoreCardWrapper}>
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
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <ScoreCard content={`${typingSpeed}`} title="Vitesse moyenne" stat />
          <Divider />
          <ScoreCard content={`${precision}%`} title="Précision" stat />
        </div>
        <Button
          color='success'
          onClick={submitScoreAndRestart}
          className={styles.statsButton}
        >
          {isLoggedIn ? 'SAUVEGARDER' : 'CONTINUER'}
        </Button>
        {isLoggedIn && (
        <Button
          onClick={() => {
            setShowStatsModal(false);
            onRestart();
          }}
          light
          className='w100'
          color="primary"
        >
          Continuer sans sauvegarder
        </Button>
        )}
        {!isLoggedIn && (
        <Button
          onClick={() => setShouldOpenSignup(true)}
          light
          className='w100'
          color="primary"
        >
          Se créer un compte
        </Button>
        )}
      </div>
      <Modal
        closeButton
        className='p2r'
        open={shouldOpenSignup}
        onClose={() => setShouldOpenSignup(false)}
        blur
      >
        <Signup />
      </Modal>
    </div>
  );
}

export default Stats;
