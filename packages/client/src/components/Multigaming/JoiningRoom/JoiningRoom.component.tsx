import { Button, StyledSpacer } from '@nextui-org/react';
import { useRouter } from 'next/router';
import React from 'react';
import { useGetSelf } from '../../../hooks/useGetSelf';

import RoomTable from '../RoomTable/RoomTable.component';
import { JoiningRoomProps } from './JoiningRoom.props';

function JoiningRoom({
  roomID, setRoomID, roomList, socket, setShouldDisplayUsernameInput,
}: JoiningRoomProps) {
  const { isLoggedIn } = useGetSelf();
  const ROOT_URL = process.env.ROOT_URL || 'http://localhost:3000';
  const router = useRouter();

  /**
   * When user click on create room, an id is generated and stored in a LEGIT_TOKENS array.
   * This id is then used to redirect the user to the room page.
   * Every time a user wants to create or join a room the id is checked
   * a little bit like a jwt token with its secret key. If the roomID isn't in the LEGIT_TOKENS
   * array the user can't join or create a room.
   */
  function createGameRoom() {
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
        onClick={() => createGameRoom()}
      >
        Créer une partie
      </Button>
      {!isLoggedIn && (
      <Button
        onClick={() => setShouldDisplayUsernameInput(true)}
        light
        className='w100'
        color="primary"
      >
        Je change mon pseudo
      </Button>
      )}
    </div>
  );
}

export default JoiningRoom;
