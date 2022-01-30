import React, {
  useContext, useEffect,
} from 'react';
import { Button } from '@blueprintjs/core';
import { useApolloClient, useMutation } from '@apollo/client';
import { ADD_NEW_SCORE_MUTATION, SELF_QUERY } from '@aqac/api';
import { roundNumber } from '@aqac/utils';
import { Scoring } from '../src/components/Scoring/Scoring.component';
import { Displayer } from '../src/components/Displayer/Displayer.component';
import KeyBoard from '../src/components/KeyBoard/KeyBoard.component';
import { MainContext } from '../src/context/MainContext';
import DisplayerHeader from '../src/components/DisplayerHeader/DisplayerHeader.component';
import RefreshButton from '../src/components/Buttons/RefreshButton/RefreshButton.component';
import Input from '../src/components/Input/Input.component';

function Main({ onSpacePress }: { onSpacePress: (e: any) => void }) {
  const { cache } = useApolloClient();
  const {
    userInput,
    isTimeOut,
    startCountDown,
    setStartCountDown,
    gameMode,
    setUserInput,
    theme,
    setShowModeSelection,
    wordsStack,
  } = useContext(MainContext);

  useEffect(() => {
    if (userInput && startCountDown === false) {
      setStartCountDown(true);
    }
  }, [userInput]);

  const [addNewScore] = useMutation(ADD_NEW_SCORE_MUTATION, {
    onCompleted: (data) => {
      const result = cache.readQuery<any, void>({ query: SELF_QUERY });
      const self = result?.self;
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
    onError: () => console.log('Score failed'),
  });

  const {
    computedWords, correctWords,
  } = useContext(MainContext);

  function onSetFinish(
    mpm: number,
    wrongWords: number,
    // eslint-disable-next-line @typescript-eslint/no-shadow
    gameMode: 'mode 1' | 'mode 2',
    points: number,
    precision: number,
    wrongLetters: number,
    totalLetters: number,
    correctLetters: number,
  ) {
    addNewScore({
      variables: {
        mpm,
        wrongWords,
        gameMode,
        points,
        precision,
        wrongLetters,
        totalLetters,
        correctLetters,
        timing: '01:00',
      },
    });
  }

  const wrongWords: number = computedWords.length - correctWords.length;
  const correctLetters: number = correctWords.join('').length + correctWords.length;
  const totalLetters: number = computedWords.join('').length + correctWords.length;
  const wrongLetters: number = totalLetters - correctLetters;
  const precision: number = roundNumber((correctLetters / totalLetters) * 100, 0) || 0;
  const wordPerMinute: number = correctLetters / 5;
  const points: number = roundNumber(correctLetters * (precision / 100), 0);
  const mpm: number = roundNumber(wordPerMinute, 0);

  return (
    <div style={{
      width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
    }}
    >
      <DisplayerHeader />
      {gameMode !== null && (
      <Button
        outlined
        style={{
          position: 'absolute', top: 200, color: theme.secondary, borderColor: theme.secondary,
        }}
        onClick={() => setShowModeSelection(true)}
      >
        Changer de mode
      </Button>
      )}
      <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
        <Scoring
          isTimeOut={isTimeOut}
          computedWords={computedWords}
          theme={theme}
          correctWords={correctWords}
          mpm={mpm}
          wrongWords={wrongWords}
          gameMode={gameMode}
          points={points}
          precision={precision}
          wrongLetters={wrongLetters}
          totalLetters={totalLetters}
          correctLetters={correctLetters}
          onSetFinish={onSetFinish}
        />
        <RefreshButton disable={!!(computedWords.length && !startCountDown)} />
      </div>
      <div className="flex justify-center">
        <Displayer wordsStack={wordsStack} />
      </div>
      <div style={{ margin: '1rem 0' }}>
        <Input
          userInput={userInput}
          setUserInput={setUserInput}
          onSpacePress={onSpacePress}
          gameMode={gameMode}
          isTimeOut={isTimeOut}
        />
      </div>
      <KeyBoard theme={theme} enable={startCountDown && !isTimeOut} />
    </div>
  );
}
export default Main;
