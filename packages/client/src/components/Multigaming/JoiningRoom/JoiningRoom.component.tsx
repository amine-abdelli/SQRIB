import { Button, StyledSpacer } from '@nextui-org/react';
import { useRouter } from 'next/router';
import React from 'react';

import RoomTable from '../RoomTable/RoomTable.component';
import { JoiningRoomProps } from './JoiningRoom.props';

function JoiningRoom({
  roomID, setRoomID, roomList, socket, setShouldDisplayUsernameInput,
}: JoiningRoomProps) {
  const ROOT_URL = process.env.ROOT_URL || 'http://localhost:3000';
  const router = useRouter();

  function createRoomGame() {
    socket.emit('generate-room-id');
    socket.on('generate-room-id', ({ roomID: payload }) => {
      router.push(`${ROOT_URL}/multigaming/${payload}`);
    });
  }

  return (
    <div className='w100'>
      <h3 className='text-center'>Rejoindre une partie</h3>
      <RoomTable setRoomName={setRoomID} data={roomList} />
      <Button
        className='w100'
        animated
        onClick={() => roomID && router.push(`${ROOT_URL}/multigaming/${btoa(`${roomID}`)}`)}
        disabled={!roomID}
      >
        rejoindre une partie
      </Button>
      <StyledSpacer />
      <Button
        animated
        className='w100'
        onClick={() => createRoomGame()}
      >
        Créer une partie
      </Button>
      <Button
        onClick={() => setShouldDisplayUsernameInput(true)}
        light
        className='w100'
        color="primary"
      >
        Je change mon pseudo
      </Button>
    </div>
  );
}

export default JoiningRoom;
