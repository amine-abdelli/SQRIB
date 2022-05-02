import React, {
  useContext,
  useEffect, useRef, useState,
} from 'react';
import { Socket } from 'socket.io-client';
import { alertService } from '../../../../services';
import { socket, socketConnect, socketDisconnect } from '../../../../services/socket.service';
import { MainContext } from '../../../context/MainContext';
import { useGetSelf } from '../../../hooks/useGetSelf';
import { defaultGameParameters, GameParametersProps } from '../CreateModal/CreateModal.props';
import EnterInput from '../EnterInput/EnterInput.component';
import GameRoom from '../GameRoom/GameRoom.component';
import JoiningRoom from '../JoiningRoom/JoiningRoom.component';
import VictoryModal from '../VictoryModal/VictoryModal.component';

function Container() {
  const { data: selfData } = useGetSelf();
  const [hasJoined, setHasJoined] = useState(false);
  const [game, setGame] = useState<any>();
  const [gameStatus, setGameStatus] = useState();
  const [roomID, setRoomID] = useState<string | undefined>();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [username, setUsername] = useState<string | undefined>();
  const [roomList, setRoomList] = useState([]);
  const [wordSet, setWordSet] = useState([]);
  const [gameParameters, setGameParameters] = useState<GameParametersProps>(defaultGameParameters);
  const [isGameEnded, setIsGameEnded] = useState(false);
  const [winner, setWinner] = useState('');
  const [counter, setCounter] = useState(5);
  const {
    wordIndex, setOffSet, setWordIndex, setComputedWords, setCorrectWords,
  } = useContext(MainContext);

  const { current: socketRef } = useRef<Socket>(socket);

  useEffect(() => {
    setUsername(selfData?.self.nickname);
  }, [selfData]);

  useEffect(() => {
    socketConnect(socketRef);
    if (hasJoined && roomID) {
      if (roomID) {
        socketRef.emit('join-room', { roomID, username, gameParameters });
        socketRef.on('join-room', ({ wordSet: wordSetPayload }) => {
          setWordSet(wordSetPayload);
        });
        socketRef.on('greet', ({ playerName }) => {
          const customMessage = playerName === username
            ? 'Vous venez de rejoindre la partie'
            : `${playerName} vient de rejoindre la partie`;
          alertService.success(customMessage, {});
        });
      }
    }
    return () => socketDisconnect(socketRef);
  }, [hasJoined]);

  useEffect(() => {
    setIsGameEnded(gameStatus === 'finished');
  }, [gameStatus]);

  useEffect(() => {
    if (socketRef.connected && hasJoined) {
      socketRef.emit('progression', { roomID, wordIndex, username });
      socketRef.on('progression', ({ clients, gameStatus: currentGameStatus }) => {
        setGameStatus(currentGameStatus);
        if (!isGameEnded && clients.length) {
          setGame([...clients]?.sort((a, b) => b.wordIndex - a.wordIndex));
        }
      });
      socketRef.on('on-win', ({
        username: userNickname,
        clients,
        wordSet: newWordSet,
      }) => {
        if (clients.length && newWordSet?.length) {
          setWinner(userNickname);
          setGame(clients);
          setWordIndex(0);
          setComputedWords([]);
          setCorrectWords([]);
          setWordSet(newWordSet);
          setOffSet(0);
        }
      });
    }
  }, [wordIndex, wordSet]);

  useEffect(() => {
    socketRef.emit('room-list');
    socketRef.on('room-list', (rooms) => {
      setRoomList(rooms);
    });
    socketRef.on('hasBeenDisconnected', ({ clients }) => {
      setGame([...clients]?.sort((a, b) => b.wordIndex - a.wordIndex));
    });
    socketRef.on('gameFinished', () => {
      console.log('gameFinished');
    });
    socketRef.on('game-status', ({ status }) => {
      setGameStatus(status);
      if (status === 'playing') {
        setCounter(5);
      }
    });
    socketRef.on('counter', ({ counter: currentCounter }) => {
      setCounter(currentCounter);
    });
  }, [hasJoined, socketRef]);

  const userList = roomList && [...roomList.flatMap(
    (room: any) => room.clients.map((client: any) => client),
  ), '34dDfdsSERbvcN?;/Sdf67ythgfE4'];

  function handleLeave() {
    socketRef.disconnect();
    setHasJoined(false);
    setIsGameEnded(false);
    setWordIndex(0);
    setComputedWords([]);
    setCorrectWords([]);
    setWordSet([]);
    setOffSet(0);
    setRoomID(undefined);
    setCounter(5);
  }

  return (
    <div style={{ width: '550px' }}>
      <div className='flex flex-column align-center w100'>
        {!hasJoined && !username && userList && (
          <EnterInput isGameEnded={isGameEnded} userList={userList} setUsername={setUsername} />
        )}
        {!hasJoined && username && (
          <JoiningRoom
            roomID={roomID}
            setRoomID={setRoomID}
            roomList={roomList}
            setHasJoined={setHasJoined}
            isCreateModalOpen={isCreateModalOpen}
            setIsCreateModalOpen={setIsCreateModalOpen}
            username={username}
            gameParameters={gameParameters}
            setGameParameters={setGameParameters}
          />
        )}
        {hasJoined && username && (
          <GameRoom
            roomID={roomID}
            game={game}
            handleLeave={handleLeave}
            isGameEnded={isGameEnded}
            socketRef={socketRef}
            username={username}
            wordSet={wordSet}
          />
        )}
        {isGameEnded && (
          <VictoryModal counter={counter} isGameEnded={isGameEnded} winnerNickname={winner} />
        )}
      </div>
    </div>
  );
}

export default Container;
