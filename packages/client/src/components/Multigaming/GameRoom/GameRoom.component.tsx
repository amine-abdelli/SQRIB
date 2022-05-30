import { Button } from '@nextui-org/react';
import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { CREATE_GAME_MUTATION } from '@aqac/api';
import { GameType } from '@aqac/utils';
import { MainContext } from '../../../context/MainContext';
import OnGame from '../OnGame/OnGame.component';
import ProgressList from '../ProgressList/ProgressList.component';
import { GameRoomProps } from './GameRoom.props';
import { createScoringObject } from '../../../utils/scoring.utils';

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
  setWordSet, setWinner, setCounter,
}: GameRoomProps) {
  const clients = game?.clients && Object.values(game?.clients);
  const self = clients?.find(({ id }) => id === socketRef.id);
  const {
    wordIndex, setOffSet, setWordIndex,
    setComputedWords, setCorrectWords, correctWords, computedWords,
  } = useContext(MainContext);
  const scoringObject = createScoringObject(correctWords, computedWords);
  const router = useRouter();
  const [createGame] = useMutation(CREATE_GAME_MUTATION);

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
    socketRef.on('save-game-mutation', ({ game: endedGame }: {game: GameType}) => {
      createGame({
        variables: {
          game: {
            name: endedGame.name,
            language: endedGame.language,
            setID: endedGame.setID,
            wordAmount: endedGame.wordAmount,
          },
          clients: Object.values(endedGame.clients)
            .filter(({ status }) => status !== 'staging')
            .map((aClient) => (
              {
                host: aClient.host,
                correctLetters: aClient.correctLetters,
                mpm: aClient.mpm,
                points: aClient.points,
                precision: aClient.precision,
                totalLetters: aClient.totalLetters,
                username: aClient.username,
                wordAmount: aClient.wordAmount,
                wordIndex: aClient.wordIndex,
                wrongLetters: aClient.wrongLetters,
                wrongWords: aClient.wrongWords,
              }
            )),
        },
      });
    });
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

    socketRef.on('counter', ({ counter: currentCounter }) => {
      setCounter(currentCounter);
    });
  }, [setCounter, setGame, socketRef]);

  function handleLeave() {
    setWordIndex(0);
    setComputedWords([]);
    setCorrectWords([]);
    setWordSet([]);
    setOffSet(0);
    setCounter(5);
    socketRef.disconnect();
    router.push('/multigaming');
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
