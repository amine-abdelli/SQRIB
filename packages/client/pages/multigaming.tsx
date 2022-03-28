import { generateWordSet } from '@aqac/utils';
import {
  Button, Grid, Progress, Spacer,
} from '@nextui-org/react';
import React, {
  useContext, useEffect, useState,
} from 'react';
import io from 'socket.io-client';
import { Displayer } from '../src/components/Displayer/Displayer.component';
import Input from '../src/components/Input/Input.component';
import KeyBoard from '../src/components/KeyBoard/KeyBoard.component';
import withAuth from '../src/components/withAuth/withAuth.hoc';
import { MainContext } from '../src/context/MainContext';
import { useGetSelf } from '../src/hooks/useGetSelf';
import { GameOptions } from '../src/utils/mode';

function Multigaming() {
  const { data: self } = useGetSelf();
  const [rooms, setRooms] = useState<any>();
  const [infos, setInfos] = useState<any>([]);
  const [currentGameId, setCurrentGameId] = useState<any>();
  const [currentGame, setCurrentGame] = useState<any>();
  const [someUsers, setSomeUsers] = useState<any>();
  const [wordSet, setWordSet] = useState<string[]>();
  const ENDPOINT = 'http://127.0.0.1:4001';
  const {
    theme, wordIndex, setIsTimeOut, setUserInput, userInput, language, gameMode,
  } = useContext(MainContext);

  useEffect(() => {
    setWordSet(generateWordSet(language, GameOptions[gameMode].stackLength));
  }, []);

  const socket = io(ENDPOINT, {
    transports: ['websocket'],
    autoConnect: false,
    withCredentials: true,
  });

  const username = self?.self?.nickname;

  (function socketConnect() {
    socket.auth = { userID: self?.self?.email };
    socket.connect();
  }());

  useEffect(() => {
    setIsTimeOut(false);
  }, []);

  function updateInfo(info: string) {
    setInfos([...infos, {
      createdAt: new Date(),
      info,
    }]);
  }

  function startGame(gameId: string) {
    updateInfo('Starting a new game');
    socket.emit('startGame', {
      gameId,
    });
    socket.on('startGame', (data) => {
      updateInfo('Game started');
    });
  }

  function createOneRoom() {
    updateInfo('Creating a game room');
    socket.emit('createGame', {
      clientId: self.self.email,
      username,
    });
  }

  function findManyRooms() {
    updateInfo('Looking for game rooms');
    socket.emit('findGames');
    socket.on('findGames', (gamesIds) => {
      updateInfo('Game rooms found');
      setRooms(gamesIds);
    });
  }

  function findOneGame(gameId: string) {
    updateInfo('Looking for a room game');
    socket.emit('findOneGame', gameId);
    socket.on('findOneGame', (game) => {
      updateInfo(`Just found a game room, ${game}`);
    });
  }

  function joinRoom(gameId: string) {
    updateInfo(`Joining game room, ${gameId}`);
    setCurrentGameId(gameId);
    socket.emit('joinGame', {
      clientId: self.self.email,
      username,
      gameId,
    });
    socket.on('joinGame', (joined) => {
      updateInfo(`You've just joined a game room, ${gameId}`);
    });
  }

  function joinRandomGame() {
    updateInfo('Looking for a random game');
    socket.emit('joinRandomGame');
    socket.on('joinRandomGame', (payload) => {
      if (payload === 'No game available') {
        updateInfo('No game room available');
        createOneRoom();
      } else {
        updateInfo('Game room found !');
        joinRoom(payload);
      }
    });
  }

  function gameProgression() {
    socket.emit('gameProgression', {
      clientId: self?.self.email,
      wordIndex,
      gameId: currentGameId,
    });
    socket.on('gameProgression', (payload) => {
      console.log('gameProgression', payload);
      setCurrentGame(payload);
    });
  }

  // function leaveGame(roomId: string) {
  //   socket.emit('leaveGame', {
  //     clientId: self.self.email,
  //     roomId,
  //   });
  // }
  useEffect(
    () => {
      gameProgression();
    },
    [wordIndex],
  );

  useEffect(() => {
    socket.on('users', (users) => {
      users.forEach((user: any) => {
        // eslint-disable-next-line no-param-reassign
        user.self = user.userID === socket.id;
        // eslint-disable-next-line no-param-reassign
        user.score = wordIndex;
      });
      setSomeUsers(users);
    });

    return function cleanup() {
      socket.disconnect();
    };
  }, [wordIndex]);

  return (
    <div>
      <div style={{ height: '80px', overflow: 'hidden' }}>
        {infos?.map(({ createdAt, info }: any) => (<p key={createdAt}>{info}</p>))}
      </div>
      <Button onClick={() => createOneRoom()}>CreateOneRoom</Button>
      <Button onClick={() => findManyRooms()}>FindManyRooms</Button>
      <Button onClick={() => startGame(currentGameId)}>Start game</Button>
      <Button onClick={() => joinRandomGame()}>Join random game</Button>
      {rooms?.map((id: any) => (
        <div key={id}>
          <Button onClick={() => {
            findOneGame(id);
            joinRoom(id);
          }}
          >
            {id}
          </Button>
        </div>
      ))}
      <Grid.Container xs={12} sm={6} gap={2}>
        {currentGame && Object.values(currentGame)?.map((user: any) => {
          console.log();
          return (
            <Grid key={Date.now()}>
              <Progress color="primary" value={50} />
            </Grid>
          );
        })}
      </Grid.Container>
      <Displayer wordsStack={wordSet?.slice(0, 100) || []} />
      <Spacer />
      <Input
        setUserInput={setUserInput}
        userInput={userInput}
      />
      <Spacer />
      <KeyBoard theme={theme} enable />
      {`${someUsers?.length} players online`}
      {someUsers?.map((user: any) => (
        <p key={user?.userID}>{user?.username}</p>
      ))}
    </div>
  );
}

export default withAuth(Multigaming);
