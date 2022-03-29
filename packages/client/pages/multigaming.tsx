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
import NicknameInput from '../src/components/Multigaming/NicknameInput/NicknameInput.component';
import { MainContext } from '../src/context/MainContext';
import { useGetSelf } from '../src/hooks/useGetSelf';
import { GameOptions } from '../src/utils/mode';

function Multigaming() {
  const { data: self } = useGetSelf();
  const [currentUser, setCurrentUser] = useState(self?.self?.email);
  const [isReadyToPlay, setIsReadyToPlay] = useState(false);
  // const [rooms, setRooms] = useState<any>();
  // const [infos, setInfos] = useState<any>([]);
  const [currentGameId, setCurrentGameId] = useState<any>();
  const [currentGame, setCurrentGame] = useState<any>();
  console.log(currentGameId);
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

  function socketConnect() {
    socket.auth = { userID: self?.self?.email };
    socket.connect();
  }

  useEffect(() => {
    setIsTimeOut(false);
  }, []);

  function initGame() {
    setIsReadyToPlay(true);
    socketConnect();
    socket.emit('initGame', currentUser);
    socket.on('initGame', ({ gameID, game }) => {
      console.log('initGame payload', { gameID, game });
      if (gameID) {
        setCurrentGameId(gameID);
        setCurrentGame(game);
      }
    });
  }

  useEffect(() => {
    console.log('isReadyToPlay', isReadyToPlay);
  }, [isReadyToPlay]);

  useEffect(() => {
    // At first connexion
    socketConnect();
    if (currentUser) {
      socket.emit('join', currentUser);
    }
  }, [currentUser]);

  function gameProgression() {
    socketConnect();
    socket.emit('gameProgression', {
      clientId: self?.self.email,
      wordIndex,
      gameId: currentGameId,
    });
    socket.on('gameProgression', (payload) => {
      setCurrentGame(payload);
    });
  }

  // function updateInfo(info: string) {
  //   socketConnect();
  //   setInfos([...infos, {
  //     createdAt: new Date(),
  //     info,
  //   }]);
  // }

  // function startGame(gameId: string) {
  //   socketConnect();
  //   updateInfo('Starting a new game');
  //   socket.emit('startGame', {
  //     gameId,
  //   });
  //   socket.on('startGame', (data) => {
  //     updateInfo('Game started');
  //   });
  // }

  // function createOneRoom() {
  //   socketConnect();
  //   updateInfo('Creating a game room');
  //   socket.emit('createGame', {
  //     clientId: self.self.email,
  //     username,
  //   });
  // }

  // function findManyRooms() {
  //   socketConnect();
  //   updateInfo('Looking for game rooms');
  //   socket.emit('findGames');
  //   socket.on('findGames', (gamesIds) => {
  //     updateInfo('Game rooms found');
  //     setRooms(gamesIds);
  //   });
  // }

  // function findOneGame(gameId: string) {
  //   socketConnect();
  //   updateInfo('Looking for a room game');
  //   socket.emit('findOneGame', gameId);
  //   socket.on('findOneGame', (game) => {
  //     updateInfo(`Just found a game room, ${game}`);
  //   });
  // }

  // function joinRoom(gameId: string) {
  //   socketConnect();
  //   updateInfo(`Joining game room, ${gameId}`);
  //   setCurrentGameId(gameId);
  //   socket.emit('joinGame', {
  //     clientId: self.self.email,
  //     username,
  //     gameId,
  //   });
  //   socket.on('joinGame', (joined) => {
  //     updateInfo(`You've just joined a game room, ${gameId}`);
  //   });
  // }

  // function joinRandomGame() {
  //   socketConnect();
  //   updateInfo('Looking for a random game');
  //   socket.emit('joinRandomGame');
  //   socket.on('joinRandomGame', (payload) => {
  //     if (payload === 'No game available') {
  //       updateInfo('No game room available');
  //       createOneRoom();
  //     } else {
  //       updateInfo('Game room found !');
  //       joinRoom(payload);
  //     }
  //   });
  // }

  // function leaveGame(roomId: string) {
  //   socket.emit('leaveGame', {
  //     clientId: self.self.email,
  //     roomId,
  //   });
  // }
  useEffect(() => {
    if (currentUser && isReadyToPlay && wordSet) {
      gameProgression();
    }
  }, [wordIndex]);

  useEffect(() => {
    socket.on('users', (users) => {
      users.forEach((user: any) => {
        // eslint-disable-next-line no-param-reassign
        user.self = user.userID === socket.id;
        // eslint-disable-next-line no-param-reassign
        user.score = wordIndex;
      });
    });

    return function cleanup() {
      socket.disconnect();
    };
  }, [wordIndex]);
  console.log(currentGame);
  return (
    <div>
      {!currentUser ? (
        <NicknameInput setCurrentUser={setCurrentUser} />
      ) : (
        <p>{`Salut ${currentUser}`}</p>
      )}
      {currentUser && !isReadyToPlay && (
        <Button onClick={initGame}>Rejoindre une partie</Button>
      )}
      {currentUser && isReadyToPlay && !wordSet && (
        <div>Loading a game...</div>
      )}
      {currentUser && isReadyToPlay && wordSet && currentGameId && (
      <>
        <Grid.Container xs={12} sm={6} gap={1}>
          {currentGame?.clients && Object.values(currentGame?.clients)?.map((user: any) => {
            console.log('youyouser', user?.wordIndex);
            return (
              <Grid key={user?.clientId}>
                <div style={{ height: '20px', width: '20px', backgroundColor: user?.color }} />
                <Progress value={user?.wordIndex} color='primary' style={{ color: user?.color }} />
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
      </>
      )}
    </div>
  );
}

export default Multigaming;
