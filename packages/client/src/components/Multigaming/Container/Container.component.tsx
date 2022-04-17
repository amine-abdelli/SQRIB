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
  const [roomID, setRoomID] = useState<string | undefined>();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [username, setUsername] = useState<string | undefined>(selfData?.self.nickname);
  const [roomList, setRoomList] = useState([]);
  const [wordSet, setWordSet] = useState([]);
  const [gameParameters, setGameParameters] = useState<GameParametersProps>(defaultGameParameters);
  const [isGameEnded, setIsGameEnded] = useState(false);
  const [winner, setWinner] = useState('');
  const {
    wordIndex, setOffSet, setWordIndex, setComputedWords, setCorrectWords,
  } = useContext(MainContext);

  const { current: socketRef } = useRef<Socket>(socket);
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
    if (socketRef.connected && hasJoined) {
      socketRef.emit('progression', { roomID, wordIndex, username });
      socketRef.on('progression', ({ clients }) => {
        if (!isGameEnded && clients.length) {
          setGame([...clients]?.sort((a, b) => b.wordIndex - a.wordIndex));
        }
      });
      socketRef.on('on-win', ({ username: userNickname, clients, wordSet: newWordSet }) => {
        if (clients) {
          setIsGameEnded(true);
          setWinner(userNickname);
          setTimeout(() => {
            setGame(clients);
            setIsGameEnded(false);
            setWordIndex(0);
            setComputedWords([]);
            setCorrectWords([]);
            setWordSet(newWordSet);
            setOffSet(0);
          }, 4000);
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
  }

  return (
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
      <VictoryModal isGameEnded={isGameEnded} winnerNickname={winner} />
    </div>
  );
}

export default Container;
