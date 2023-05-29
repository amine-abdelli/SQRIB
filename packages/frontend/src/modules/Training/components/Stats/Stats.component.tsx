import React, { useContext, useState } from 'react';
import { Divider } from '@blueprintjs/core';
import {
  Button, Text,
} from '@nextui-org/react';
import { InfoCircle } from 'react-iconly';

import Success from '../../../../assets/images/success.png';
import star from '../../../../assets/images/star.png';
// import Signup from '../Signup/Signup.component';
import { ScoreCard } from '../../../../components/ScoreCard/ScoreCard.component';
import { IStats } from './Stats.props';
import './Stats.style.scss';
import { EngineProps } from '../../Engine';

function countCorrectlyTypedWords(typedWords: string[], wordChain: string[]) {
  let correctlyTypedWords = 0;
  for (let i = 0; i < typedWords.length; i++) {
    const element = typedWords[i];
    if(element === wordChain[i]) {
      correctlyTypedWords += 1;
    }
  }
  return correctlyTypedWords
}

function Stats(props: EngineProps) {
  const { score, typedWords, wordChain } = props;
  const wpm = score.wpm;
  const accuracy = score.accuracy;
  const points = score.points; 
  const durationInSeconds = (score.endTime - score.startTime) / 1000;
  const totalTypedWords = typedWords.length;
  const correctlyTypedWords = countCorrectlyTypedWords(typedWords, wordChain);
  const incorrectlyTypedWords = typedWords.length - countCorrectlyTypedWords(typedWords, wordChain);
  const ranking = 'DONT_KNOW_YET';

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
      <div style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column',
      }}
      >
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
        <div
          className='flex justify-center flex-column'
          style={{
            flexBasis: '100%', alignItems: 'center',
          }}
        >
          <span className='flex align-center'>
            <Text h3 className='mpm'>
              {`${wpm || 0} mpm`}
            </Text>
          </span>
        </div>
        <Divider />
        <div className='score-card--wrapper'>
          <ScoreCard content={totalTypedWords} title="Mots saisies" stat />
          <Divider />
          <ScoreCard content={incorrectlyTypedWords} title="Mots incorrects" malus stat />
          <Divider />
          <ScoreCard content={correctlyTypedWords} title="Mots corrects" bonus stat />
        </div>
        <Divider />
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <ScoreCard content={999} title="Total lettres" stat />
          <Divider />
          <ScoreCard content={999} title="Lettres incorrectes" malus stat />
          <Divider />
          <ScoreCard content={999} title="Lettres corrects" bonus stat />
        </div>
        <Divider />
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <ScoreCard content={`${999}`} title="Vitesse moyenne" stat />
          <Divider />
          <ScoreCard content={`${accuracy}%`} title="Précision" stat />
          <Divider />
          <ScoreCard content={points} title="Points" stat />
        </div>
        <Button
          color='success'
          onClick={submitScoreAndRestart}
          className='stats--button'
        >
          {isLoggedIn ? 'SAUVEGARDER' : 'CONTINUER'}
        </Button>
        {isLoggedIn && (
          <Button
            onClick={() => {
              // setShowStatsModal(false);
              // onRestart();
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
