import { Button, Spacer } from '@nextui-org/react';
import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { GameStatus } from '@sqrib/utils';
import { MainContext } from '../../../context/MainContext';
import OnGame from '../OnGame/OnGame.component';
import ProgressList from '../ProgressList/ProgressList.component';
import { GameRoomProps } from './GameRoom.props';
import { createScoringObject } from '../../../utils/scoring.utils';
import { Routes } from '../../../utils/enums';
import { formatSecondsIntoTimer } from '../../../utils/timer.utils';

function updateGameWithSortedClients(currentGame: any) {
  const sortedClients = currentGame?.clients && Object.entries(currentGame?.clients)
    .sort(
      ([, a]: [string, any], [, b]: [string, any]) => b.wordIndex - a.wordIndex,
    )
    .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
  return { ...currentGame, clients: sortedClients };
}

function GameRoom({
  roomID, username, game, wordSet, socketRef, isGameEnded, setGame,
  setWordSet, setCounter, setShouldDisplayFirstCounterModal,
}: GameRoomProps) {
  const [timer, setTimer] = useState(0);
  const clients = game?.clients && Object.values(game?.clients);
  const self = clients?.find(({ id }) => id === socketRef.id);
  const {
    wordIndex, setOffSet, setWordIndex,
    setComputedWords, setCorrectWords, correctWords, computedWords,
  } = useContext(MainContext);
  // const [onGameSubmit] = useMutation(CREATE_GAME_MUTATION);
  const scoringObject = createScoringObject(correctWords, computedWords);
  const router = useRouter();

  useEffect(() => {
    if (socketRef.connected) {
      socketRef.emit('progression', {
        roomID, wordIndex, username, scoringObject,
      });
      socketRef.on('progression', ({ game: currentGame }) => {
        // Here sort the clients by wordIndex
        if (!isGameEnded && clients?.length) {
          const gameWithSortedClients = updateGameWithSortedClients(currentGame);
          setGame(gameWithSortedClients);
        }
      });
    }
  }, [clients.length, isGameEnded, roomID, setComputedWords, setCorrectWords, setGame, setOffSet,
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

  return (
    <>
      <div className='flex justify-between'>
        <h3>{game.name}</h3>
        <Button auto onClick={handleLeave}>Quitter</Button>
      </div>
      <Spacer />
      <p>{formatSecondsIntoTimer(timer)}</p>
      <ProgressList data={clients} />
      <Spacer />
      {socketRef.connected && wordSet && (
        <OnGame
          wordSet={wordSet}
          isGameEnded={game?.status === GameStatus.FINISHED || game?.status === GameStatus.STAGING}
          isAllow={self?.status === GameStatus.PLAYING && game?.status === GameStatus.PLAYING}
          disabled={self?.status !== GameStatus.PLAYING || game?.status !== GameStatus.PLAYING}
        />
      )}
    </>
  );
}

export default GameRoom;
