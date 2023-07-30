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
import { EngineProps } from '../../Engine';
import { TrainingMode } from '../../../../components/Options/Options.props';
import { COLORS } from '../../../../theme/colors';
import { Spacer, SpacerSize } from '../../../../components';
import { StatsProps } from '../TrainingModal/TrainingModal.component';

function countCorrectlyTypedWords(typedWords: string[], wordChain: string[]) {
  let correctlyTypedWords = 0;
  for (let i = 0; i < typedWords.length; i++) {
    const element = typedWords[i];
    if (element === wordChain[i]) {
      correctlyTypedWords += 1;
    }
  }
  return correctlyTypedWords
}

function Stats(props: StatsProps) {
  const { score, nextStep } = props;
  const totalTypedWords = score.typedWords.length;
  const wpm = score.wpm;
  const accuracy = score.accuracy;
  const points = score.points;
  const correctlyTypedWords = countCorrectlyTypedWords(score.wordChain, score.typedWords);
  const incorrectlyTypedWords = score.typedWords.length - countCorrectlyTypedWords(score.wordChain, score.typedWords);
  console.log('score ', score)

  // const { scores, isLoggedIn } = useGetSelf();
  const isLoggedIn = true;

  const [shouldOpenSignup, setShouldOpenSignup] = useState(false);
  // const isBestScore = mpm > topValue(scores, 'mpm') && scores?.length > 0;
  // const isFirstScore = scores?.length === 0;
  // const isNotParticular = !isFirstScore && !isBestScore;
  const isBestScore = true;
  const isFirstScore = false;
  const isNotParticular = false;
  function submitScoreAndRestart() {
    if (isLoggedIn) {
      // onSetFinish(
      //   mpm,
      //   wrongWords,
      //   points,
      //   precision,
      //   wrongLetters,
      //   totalLetters,
      //   correctLetters,
      // );
    }
    // onRestart();
    // setShowStatsModal(false);
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
           {/* ! TODO USE REAL DATA INSTEAD OF 76 72 and 4 */}
          <ScoreCard content={
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <span style={{ fontWeight: 'bold' }}>76</span>
              <Spacer x size={SpacerSize.SMALL} />
              <span>{"("}</span>
              <span style={{ color: COLORS.SUCCESS }}>72</span>
              <span>|</span>
              <span style={{ color: COLORS.ERROR }}>4</span>
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
