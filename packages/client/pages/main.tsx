import React, {
  useContext, useEffect,
} from 'react';
import { useApolloClient, useMutation } from '@apollo/client';
import { ADD_NEW_SCORE_MUTATION, SELF_QUERY } from '@aqac/api';
import { Game } from '@aqac/utils';
import { Scoring } from '../src/components/Scoring/Scoring.component';
import { Displayer } from '../src/components/Displayer/Displayer.component';
import KeyBoard from '../src/components/KeyBoard/KeyBoard.component';
import { MainContext } from '../src/context/MainContext';
import DisplayerHeader from '../src/components/DisplayerHeader/DisplayerHeader.component';
import RefreshButton from '../src/components/Buttons/RefreshButton/RefreshButton.component';
import Input from '../src/components/Input/Input.component';
import { createScoringObject } from '../src/utils/scoring.utils';
import { alertService } from '../services';
import { useGetSelf } from '../src/hooks/useGetSelf';

function Main() {
  const { cache } = useApolloClient();
  const {
    userInput,
    isTimeOut,
    startTimer,
    setStartTimer,
    setUserInput,
    theme,
    wordsStack,
  } = useContext(MainContext);

  useEffect(() => {
    if (userInput && startTimer === false) {
      setStartTimer(true);
    }
  }, [userInput]);

  const [addNewScore] = useMutation(ADD_NEW_SCORE_MUTATION, {
    onCompleted: (data) => {
      const result = cache.readQuery<any, void>({ query: SELF_QUERY });
      const self = result?.self;
      alertService.success('Score sauvegardé !', {});
      // const cachedValue = [...self.scores, data.addScoring];
      // UseCacheUpdate(SELF_QUERY, 'scores', cachedValue, ...self);
      cache.writeQuery({
        query: SELF_QUERY,
        data: {
          self: {
            ...self,
            scores: [...self.scores, data.addScoring],
          },
        },
      });
    },
    onError: (error) => {
      alertService.error('Une erreur est survenue lors de la sauvegarde de votre score', {});
      console.error(error);
    },
  });
  const { data: selfData } = useGetSelf();
  const {
    computedWords, correctWords,
  } = useContext(MainContext);

  function onSetFinish(
    mpm: number,
    wrongWords: number,
    points: number,
    precision: number,
    wrongLetters: number,
    totalLetters: number,
    correctLetters: number,
  ) {
    addNewScore({
      variables: {
        type: Game.SOLO,
        mpm,
        wrongWords,
        points,
        precision,
        wrongLetters,
        totalLetters,
        correctLetters,
        language: selfData?.self.settings.language, //!
        username: selfData?.self.nickname || null, //!
        timer: 60, //!
      },
    });
  }

  const {
    wrongWords, correctLetters, totalLetters, points, precision, wrongLetters, mpm,
  } = createScoringObject(correctWords, computedWords);

  return (
    <div
      className='w100 flex flex-column justify-between'
    >
      <DisplayerHeader />
      <div
        className='flex align-center'
        style={{ margin: '10px 0' }}
      >
        <Scoring
          isTimeOut={isTimeOut}
          computedWords={computedWords}
          correctWords={correctWords}
          mpm={mpm}
          wrongWords={wrongWords}
          points={points}
          precision={precision}
          wrongLetters={wrongLetters}
          totalLetters={totalLetters}
          correctLetters={correctLetters}
          onSetFinish={onSetFinish}
          startTimer={startTimer}
        />
        <RefreshButton disable={Boolean(computedWords.length && !startTimer)} />
      </div>
      <div className="flex justify-center">
        <Displayer wordsStack={wordsStack} />
      </div>
      <div style={{ margin: '1rem 0' }}>
        <Input
          userInput={userInput}
          setUserInput={setUserInput}
          isTimeOut={isTimeOut}
        />
      </div>
      <KeyBoard theme={theme} enable={startTimer && !isTimeOut} />
    </div>
  );
}
export default Main;
