import React, {
  useContext, useEffect, useRef,
} from 'react';
import { useApolloClient, useMutation } from '@apollo/client';
import { ADD_NEW_SCORE_MUTATION, SELF_QUERY } from '@sqrib/api';
import { Game } from '@sqrib/utils';
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
import { socket, socketConnect } from '../services/socket.service';
import { useWindowSize } from '../src/hooks/useWindowSize';
import Options from '../src/components/Options/Options.component';

function Main() {
  const { cache } = useApolloClient();
  const {
    userInput,
    setUserInput,
    isTimeOut,
    startTimer,
    setStartTimer,
    wordsStack,
  } = useContext(MainContext);

  useEffect(() => {
    if (userInput && startTimer === false) {
      setStartTimer(true);
    }
  }, [userInput]);

  const { current: socketRef } = useRef(socket);
  useEffect(() => {
    socketConnect(socketRef);
  }, []);
  const [addNewScore] = useMutation(ADD_NEW_SCORE_MUTATION, {
    onCompleted: (data) => {
      const result = cache.readQuery<any, void>({ query: SELF_QUERY });
      // Update leaderboard
      socketRef.emit('update-leader-board');
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
        timer: 60,
      },
    });
  }

  const {
    wrongWords, correctLetters, totalLetters, points, precision, wrongLetters, mpm,
  } = createScoringObject(correctWords, computedWords);

  const { isSmallScreen } = useWindowSize();
  return (
    <div style={{
      padding: `0 ${isSmallScreen ? 0 : '20px'}`,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      height: '100%',
    }}
    >
      <div
        className='w100 flex flex-column justify-between'
        style={{
          background: '#FFFFFF', border: '4px solid black', boxShadow: '4px 4px 0px black', padding: '0 25px 25px 25px', margin: 0,
        }}
      >
        <Options />
        <div
          className='flex align-center'
          style={{ margin: '10px 0 0 0' }}
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
            timer
          />
        </div>
        <DisplayerHeader customStack={wordsStack} />
        <div style={{ position: 'relative' }}>
          <RefreshButton disable={Boolean(computedWords.length && !startTimer)} />
          <Input
            userInput={userInput}
            setUserInput={setUserInput}
            isTimeOut={isTimeOut}
          />
        </div>
        <div className="flex justify-center">
          <Displayer bordered wordsStack={wordsStack} />
        </div>
      </div>
      <KeyBoard enable={startTimer && !isTimeOut} />
    </div>
  );
}
export default Main;
