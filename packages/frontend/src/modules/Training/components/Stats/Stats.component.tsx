import React, { useState } from 'react';
import { Divider } from '@blueprintjs/core';
import {
  Button, Text,
} from '@nextui-org/react';

import Success from '../../../../assets/images/success.png';
import star from '../../../../assets/images/star.png';
// import Signup from '../Signup/Signup.component';
import { ScoreCard } from '../../../../components/ScoreCard/ScoreCard.component';
import './Stats.style.scss';
import { COLORS } from '../../../../theme/colors';
import { Spacer, SpacerSize } from '../../../../components';
import { StatsProps } from '../TrainingModal/TrainingModal.component';
import { countCorrectlyTypedWords, countLetters } from '../../../../utils';

function Stats(props: StatsProps) {
  const { score, nextStep, wordChain, typedWords } = props;
  const totalTypedWords = typedWords.length;
  const wpm = score.wpm;
  const accuracy = score.accuracy;
  const points = score.points;
  const correctlyTypedWords = countCorrectlyTypedWords(wordChain, typedWords);
  const incorrectlyTypedWords = typedWords.length - countCorrectlyTypedWords(wordChain, typedWords);
  const { correctLetters, wrongLetters, totalLetters } = countLetters(wordChain, typedWords)

  const isLoggedIn = true;

  const [shouldOpenSignup, setShouldOpenSignup] = useState(false);

  const isBestScore = true;
  const isFirstScore = false;
  const isNotParticular = false;

  function submitScoreAndRestart() {
    if (isLoggedIn) {
      // submitScore();
    }
  }
  
  return (
    <div className='stats--wrapper'>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        {isBestScore && <Text style={{ textAlign: 'center' }}>MEILLEUR SCORE</Text>}
        {isBestScore && <h4 style={{ textAlign: 'center' }}>FELICITATION</h4>}
        {isFirstScore && <Text style={{ textAlign: 'center' }}>TON PREMIER SCORE</Text>}
        {(isNotParticular || !isLoggedIn) && <Text h2 style={{ textAlign: 'center' }}>NOUVEAU SCORE</Text>}
        <img
          src={isBestScore || isFirstScore ? Success : star}
          alt="Picture of the author"
          width='80px'
          height='80px'
        />
      </div>
      <div className='stats--content'>
        <div className='flex justify-center flex-column' style={{ flexBasis: '100%', alignItems: 'center' }}>
          <span className='flex align-center'>
            <Spacer y size={SpacerSize.SMALL} />
            <h1 className='mpm' style={{ fontWeight: 'bolder' }}>
              {`${wpm || 0} mpm`}
            </h1>
            <Spacer y size={SpacerSize.SMALL} />
          </span>
        </div>
        <Divider />
        <div className='score-card--wrapper'>
          <ScoreCard content={totalTypedWords} title="Typed words" stat />
          <Divider />
          <ScoreCard content={incorrectlyTypedWords} title="Incorrect words" malus stat />
          <Divider />
          <ScoreCard content={correctlyTypedWords} title="Correct words" bonus stat />
        </div>
        <Divider />
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <ScoreCard content={
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <span style={{ fontWeight: 'bold' }}>{totalLetters}</span>
              <Spacer x size={SpacerSize.SMALL} />
              <span>{"("}</span>
              <span style={{ color: COLORS.SUCCESS }}>{correctLetters}</span>
              <span>|</span>
              <span style={{ color: COLORS.ERROR }}>{wrongLetters}</span>
              <span>)</span>
            </div>
          } title="Keystrokes" stat />
          <Divider />
          <ScoreCard content={`${accuracy}%`} title="Accuracy" stat />
          <Divider />
          <ScoreCard content={points} title="Points" stat />
        </div>
        <Button
          color='success'
          onClick={() => {
            submitScoreAndRestart()
            nextStep()
          }}
          className='stats--button'
        >
          {isLoggedIn ? 'SAUVEGARDER' : 'CONTINUER'}
        </Button>
        {isLoggedIn && (
          <Button
            onClick={() => {
              nextStep()
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
    </div>
  );
}

export { Stats };
