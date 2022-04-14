import {
  Button, Modal, StyledSpacer,
} from '@nextui-org/react';
import React, {
  useContext,
  useEffect, useRef, useState,
} from 'react';
import { Socket } from 'socket.io-client';
import { alertService } from '../../../../services';
import { socket, socketConnect, socketDisconnect } from '../../../../services/socket.service';
import { MainContext } from '../../../context/MainContext';
import { useGetSelf } from '../../../hooks/useGetSelf';
import { order } from '../../../utils/numbers';
import ProgressBar from '../../ProgressBar/ProgressBar.component';
import CreateModal from '../CreateModal/CreateModal.component';
import { defaultGameParameters, GameParametersProps } from '../CreateModal/CreateModal.props';
import EnterInput from '../EnterInput/EnterInput.component';
import OnGame from '../OnGame/OnGame.component';
import RoomTable from '../RoomTable/RoomTable.component';

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
  const { wordIndex, setWordIndex, setOffSet } = useContext(MainContext);

  const { current: socketRef } = useRef<Socket>(socket);
  useEffect(() => {
    if (hasJoined) {
      socketConnect(socketRef);
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
    } else {
      socketDisconnect(socketRef);
    }
    return () => socketDisconnect(socketRef);
  }, [hasJoined]);

  useEffect(() => {
    if (socketRef.connected && hasJoined) {
      socketRef.emit('progression', { roomID, wordIndex, username });
      socketRef.on('progression', (
        { clients },
      ) => {
        if (!isGameEnded && clients.length) {
          setGame([...clients]?.sort((a, b) => b.wordIndex - a.wordIndex));
        }
      });
    }
  }, [wordIndex, wordSet]);

  useEffect(() => {
    socketRef.emit('room-list');
    socketRef.on('room-list', (rooms) => {
      setRoomList(rooms);
    });
  }, [hasJoined, socketRef]);

  useEffect(() => {
    if (socketRef.disconnected) {
      setHasJoined(false);
    }
  }, [socketRef]);

  const userList = roomList && [...roomList.flatMap(
    (room: any) => room.clients.map((client: any) => client),
  ), '34dDfdsSERbvcN?;/Sdf67ythgfE4'];

  return (
    <div className='flex flex-column align-center' style={{ width: '100%' }}>
      {!hasJoined && !username && userList && (
        <EnterInput isGameEnded={isGameEnded} userList={userList} setUsername={setUsername} />
      )}
      {!hasJoined && username && (
        <div style={{ width: '100%' }}>
          <h3 className='text-center'>Rejoindre une partie</h3>
          <RoomTable setRoomName={setRoomID} data={roomList} />
          <Button
            css={{ width: '100%' }}
            animated
            onClick={() => setHasJoined(true)}
            disabled={!roomID}
          >
            rejoindre une partie
          </Button>
          <StyledSpacer />
          <Button
            animated
            css={{ width: '100%' }}
            onClick={() => setIsCreateModalOpen(true)}
          >
            Créer une partie
          </Button>
          {isCreateModalOpen && (
            <CreateModal
              isVisible={isCreateModalOpen}
              setIsVisible={setIsCreateModalOpen}
              setRoomID={setRoomID}
              setHasJoined={setHasJoined}
              username={username}
              setGameParameters={setGameParameters}
              gameParameters={gameParameters}
            />
          )}
        </div>
      )}
      {hasJoined && username && (
        <div>
          <h3>{roomID}</h3>
          {`Es-tu prêt ${username} ?`}
          {game?.map(({
            wordIndex: index, username: nickname, color, wordAmount,
          }: any, i: number) => {
            let progress = (index / wordAmount) * 100;
            if (progress === 100) {
              progress = 0;
              socketRef.emit('on-win', { username: nickname, roomID });
              socketRef.on('on-win', ({ username: userNickname, clients, wordSet: newWordSet }) => {
                if (clients) {
                  setIsGameEnded(true);
                  setTimeout(() => {
                    setGame(clients);
                    setIsGameEnded(false);
                    setWordIndex(0);
                    // fix newWordSet generated
                    setWordSet(newWordSet);
                    setOffSet(0);
                    // ? Créer un state pour partie terminée pour que tous les joueurs
                    // ? puissent voir qu'elle est terminée et ne puisse plus rien saisir.
                    // ? Gérer ca côté back?
                  }, 4000);
                }
              });
            }
            return (nickname && (
              <div key={nickname} className='flex align-center'>
                <span style={{
                  width: '10%',
                }}
                >
                  {order(i + 1)}
                </span>
                <div style={{ width: '20%' }}>
                  <span style={{ textAlign: 'start' }}>
                    {nickname}
                  </span>
                </div>
                <ProgressBar
                  key={nickname}
                  color={color}
                  completed={progress}
                  style={{ width: '70%' }}
                />
              </div>
            ));
          })}
          {' '}
          {socketRef.connected && wordSet && (
          <OnGame
            wordSet={wordSet}
            isGameEnded={isGameEnded}
          />
          )}
        </div>
      )}
      <Modal
        open={isGameEnded}
        onClose={() => null}
      >
        <p>Une nouvelle partie va commencer dans quelques secondes...</p>
      </Modal>
    </div>
  );
}

export default Container;
