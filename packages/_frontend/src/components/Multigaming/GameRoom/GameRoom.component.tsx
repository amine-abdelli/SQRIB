import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { GameStatus } from '@sqrib/utils';
import { MainContext } from '../../../context/MainContext';
import ProgressList from '../ProgressList/ProgressList.component';
import { GameRoomProps } from './GameRoom.props';
import { createScoringObject } from '../../../utils/scoring.utils';
import { Routes } from '../../../utils/enums';
import { formatSecondsIntoTimer } from '../../../utils/timer.utils';
import Card from '../../../UI/Card/Card.component';
import Button from '../../../UI/Button/Button.component';
import Spacer from '../../../UI/Spacer/Spacer.component';
import { Displayer } from '../../Displayer/Displayer.component';
import Input from '../../Input/Input.component';
import KeyBoard from '../../KeyBoard/KeyBoard.component';
import { useWindowSize } from '../../../hooks/useWindowSize';
import DisplayerHeader from '../../DisplayerHeader/DisplayerHeader.component';
import { Scoring } from '../../Scoring/Scoring.component';

function updateGameWithSortedClients(currentGame: any) {
  const sortedClients = currentGame?.clients && Object.entries(currentGame?.clients)
    .sort(
      ([, a]: [string, any], [, b]: [string, any]) => b.wordIndex - a.wordIndex,
    )
    .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
  return { ...currentGame, clients: sortedClients };
}

function GameRoom({
  roomID, username, game, wordSet, socketRef, setGame,
  setWordSet, setCounter, setShouldDisplayFirstCounterModal,
}: GameRoomProps) {
  const [timer, setTimer] = useState(0);
  const clients = game?.clients && Object.values(game?.clients);
  const self = clients?.find(({ id }) => id === socketRef.id);
  const {
    wordIndex, setOffSet, setWordIndex,
    setComputedWords, setCorrectWords, correctWords, computedWords, setUserInput, userInput,
  } = useContext(MainContext);

  const isGameEnded = game?.status === GameStatus.FINISHED || game?.status === GameStatus.STAGING;
  const isAllow = self?.status === GameStatus.PLAYING && game?.status === GameStatus.PLAYING;
  const disabled = self?.status !== GameStatus.PLAYING || game?.status !== GameStatus.PLAYING;
  // const scoringObject = createScoringObject(correctWords, computedWords);
  const router = useRouter();
  const { isMediumScreen } = useWindowSize();
  const scoringObject = createScoringObject(correctWords, computedWords);
  const {
    wrongWords, correctLetters, totalLetters, points, precision, wrongLetters, mpm,
  } = scoringObject;
  useEffect(() => {
    if (socketRef.connected) {
      socketRef.emit('progression', {
        roomID, wordIndex, username, scoringObject,
      });
      socketRef.on('progression', ({ game: currentGame }) => {
        // Here sort the clients by wordIndex
        if (!(game?.status === GameStatus.FINISHED) && clients?.length) {
          const gameWithSortedClients = updateGameWithSortedClients(currentGame);
          setGame(gameWithSortedClients);
        }
      });
    }
  }, [clients.length, game?.status, roomID, setComputedWords, setCorrectWords, setGame, setOffSet,
    setWordIndex, setWordSet, socketRef, username, wordIndex]);

  useEffect(() => {
    socketRef.on('on-win', ({
      game: currentGame,
      wordSet: newWordSet,
    }) => {
      setGame(currentGame);
      setWordIndex(0);
      setComputedWords([]);
      setCorrectWords([]);
      setOffSet(0);
      if (clients.length && newWordSet?.length) {
        setWordSet(newWordSet);
      }
    });
    socketRef.on('multiplayer-timer', (serverTimer) => {
      setTimer(serverTimer);
    });
  }, [socketRef]);

  useEffect(() => {
    socketRef.on('hasBeenDisconnected', ({ game: currentGame }) => {
      const updatedGameWithSortedClients = updateGameWithSortedClients(currentGame);
      setGame(updatedGameWithSortedClients);
    });

    if (game?.status === 'playing') {
      setCounter(5);
    }

    socketRef.on('counter', ({ counter: currentCounter, isFirstCounter }) => {
      if (isFirstCounter) setShouldDisplayFirstCounterModal(true);
      setCounter(currentCounter);
      if (currentCounter === -2) {
        setShouldDisplayFirstCounterModal(false);
      }
    });
  }, [setCounter, setGame, socketRef, setShouldDisplayFirstCounterModal]);

  function handleLeave() {
    setWordIndex(0);
    setComputedWords([]);
    setCorrectWords([]);
    setWordSet([]);
    setOffSet(0);
    setCounter(5);
    socketRef.disconnect();
    router.push(Routes.MULTIGAMING);
  }
  const { isLargeScreen } = useWindowSize();
  return (
    socketRef.connected && wordSet ? (
      <>
        <Card shadowed styles={{ display: 'flex' }}>
          <div>
            <div className='flex justify-between align-center'>
              <h3 style={{ fontWeight: 800, margin: 0 }}>{game.name}</h3>
              <p style={{ fontWeight: 800, fontSize: '32px', margin: 0 }}>
                {formatSecondsIntoTimer(timer)}
              </p>
            </div>
            {!isLargeScreen && (
            <Scoring
              isTimeOut={false}
              computedWords={computedWords}
              correctWords={correctWords}
              mpm={mpm}
              wrongWords={wrongWords}
              points={points}
              precision={precision}
              wrongLetters={wrongLetters}
              totalLetters={totalLetters}
              correctLetters={correctLetters}
              onSetFinish={() => null}
            />
            )}
            {!isLargeScreen && (
            <div style={{
              display: 'flex',
              flexDirection: isMediumScreen ? 'column-reverse' : 'row',
              alignItems: 'center',
              width: '100%',
              justifyContent: 'center',
            }}
            >
              <DisplayerHeader customStack={wordSet} />
            </div>
            )}
            <Input
              setUserInput={setUserInput}
              userInput={userInput}
              isTimeOut={isGameEnded}
              disabled={disabled}
            />
            <Displayer bordered wordsStack={wordSet?.slice(0, 100) || []} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <ProgressList data={clients} socketRef={socketRef} />
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
            >
              <Button stretch text="Quitter" onClick={handleLeave} />
            </div>
          </div>
        </Card>
        <Spacer />
        <KeyBoard enable={isAllow} />
      </>
    ) : <div />
  );
}

export default GameRoom;
