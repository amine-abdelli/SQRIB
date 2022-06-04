import { Button } from '@nextui-org/react';
import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { MainContext } from '../../../context/MainContext';
import OnGame from '../OnGame/OnGame.component';
import ProgressList from '../ProgressList/ProgressList.component';
import { GameRoomProps } from './GameRoom.props';
import { createScoringObject } from '../../../utils/scoring.utils';
import { Routes } from '../../../utils/enums';

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
  setWordSet, setWinner, setCounter, setShouldDisplayFirstCounterModal,
}: GameRoomProps) {
  const clients = game?.clients && Object.values(game?.clients);
  const self = clients?.find(({ id }) => id === socketRef.id);
  const {
    wordIndex, setOffSet, setWordIndex,
    setComputedWords, setCorrectWords, correctWords, computedWords,
  } = useContext(MainContext);
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
    setWinner, setWordIndex, setWordSet, socketRef, username, wordIndex]);

  useEffect(() => {
    socketRef.on('on-win', ({
      username: userNickname,
      game: currentGame,
      wordSet: newWordSet,
    }) => {
      setGame(currentGame);
      setWinner(userNickname);
      setWordIndex(0);
      setComputedWords([]);
      setCorrectWords([]);
      setOffSet(0);
      if (clients.length && newWordSet?.length) {
        setWordSet(newWordSet);
      }
    });
  }, [socketRef]);

  useEffect(() => {
    socketRef.on('hasBeenDisconnected', ({ game: currentGame }) => {
      const updatedGameWithSortedClients = updateGameWithSortedClients(currentGame);
      setGame(updatedGameWithSortedClients);
    });
    socketRef.on('gameFinished', () => {
      console.log('gameFinished');
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
    <div>
      <div className='flex justify-between'>
        <h3>{game.name}</h3>
        <Button auto onClick={handleLeave}>Quitter</Button>
      </div>
      {`Bienvenue ${username}`}
      <ProgressList data={clients} />
      {socketRef.connected && wordSet && (
        <OnGame
          wordSet={wordSet}
          isGameEnded={game?.status === 'finished' || game?.status === 'staging'}
          isAllow={self?.status === 'playing' && game?.status === 'playing'}
          disabled={self?.status !== 'playing' || game?.status !== 'playing'}
        />
      )}
    </div>
  );
}

export default GameRoom;
