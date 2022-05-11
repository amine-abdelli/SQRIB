import React, { useEffect, useRef, useState } from 'react';
import { Socket } from 'socket.io-client';
import { socket, socketConnect, socketDisconnect } from '../../services/socket.service';
import { defaultGameParameters, GameParametersProps } from '../../src/components/Multigaming/CreateModal/CreateModal.props';
import EnterInput from '../../src/components/Multigaming/EnterInput/EnterInput.component';
import JoiningRoom from '../../src/components/Multigaming/JoiningRoom/JoiningRoom.component';
import { useGetSelf } from '../../src/hooks/useGetSelf';

function Multigaming() {
  const [username, setUsername] = useState<string | undefined>('');
  const [roomID, setRoomID] = useState<string | undefined>('');
  const [gameParameters, setGameParameters] = useState<GameParametersProps>(defaultGameParameters);
  const [roomList, setRoomList] = useState([]);
  const { data: selfData } = useGetSelf();
  const { current: socketRef } = useRef<Socket>(socket);

  useEffect(() => {
    socketConnect(socketRef);
    setUsername(selfData?.self.nickname);
    return () => socketDisconnect(socketRef);
  }, [selfData]);

  useEffect(() => {
    socketRef.emit('room-list');
    socketRef.on('room-list', (rooms) => {
      setRoomList(rooms);
    });
  }, [socketRef]);
  return (
    <div style={{ width: '550px' }}>
      {!username && roomList
        && (
          <EnterInput
            setUsername={setUsername}
          />
        )}
      {username && (
        <JoiningRoom
          roomID={roomID}
          setRoomID={setRoomID}
          roomList={roomList}
          username={username}
          gameParameters={gameParameters}
          setGameParameters={setGameParameters}
          socket={socketRef}
        />
      )}
    </div>
  );
}

export default Multigaming;
