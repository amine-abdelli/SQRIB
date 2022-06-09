import { Modal } from '@nextui-org/react';
import React, { useEffect, useRef, useState } from 'react';
import { Socket } from 'socket.io-client';
import { socket, socketConnect, socketDisconnect } from '../../services/socket.service';
import EnterInput from '../../src/components/Multigaming/EnterInput/EnterInput.component';
import JoiningRoom from '../../src/components/Multigaming/JoiningRoom/JoiningRoom.component';
import { useGetSelf } from '../../src/hooks/useGetSelf';
import { useLocalStorage } from '../../src/hooks/useLocalStorage';
import { useWindowSize } from '../../src/hooks/useWindowSize';

function Multigaming() {
  const [usernameStoredInLocalStorage] = useLocalStorage('nickname', '');
  const [username, setUsername] = useState<string | undefined>(usernameStoredInLocalStorage);
  const [roomID, setRoomID] = useState<string | undefined>('');
  const [roomList, setRoomList] = useState([]);
  const { isMediumScreen } = useWindowSize();
  const [shouldDisplayUsernameInput, setShouldDisplayUsernameInput] = useState(
    !!usernameStoredInLocalStorage,
  );
  const { data: selfData } = useGetSelf();
  const { current: socketRef } = useRef<Socket>(socket);

  useEffect(() => {
    socketConnect(socketRef);
    socketRef.emit('room-list');
    socketRef.on('room-list', (rooms) => {
      setRoomList(rooms);
    });
    return () => socketDisconnect(socketRef);
  }, [socketRef]);

  useEffect(() => {
    setUsername(selfData?.self.nickname || usernameStoredInLocalStorage);
  }, [selfData]);

  useEffect(() => {
    setShouldDisplayUsernameInput(!!(!username && roomList));
  }, [username, roomList]);
  return (
    <div style={{ width: isMediumScreen ? 'auto' : '550px' }}>
      <Modal
        open={shouldDisplayUsernameInput}
        onClose={() => setShouldDisplayUsernameInput(false)}
      >
        <EnterInput
          setUsername={setUsername}
        />
      </Modal>
      <JoiningRoom
        roomID={roomID}
        setRoomID={setRoomID}
        roomList={roomList}
        socket={socketRef}
        setShouldDisplayUsernameInput={setShouldDisplayUsernameInput}
      />
    </div>
  );
}

export default Multigaming;
