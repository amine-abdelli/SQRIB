import { useRouter } from 'next/router';
import React from 'react';
import { theme } from '../../../../styles/theme';
import { useGetSelf } from '../../../hooks/useGetSelf';
import Button from '../../../UI/Button/Button.component';
import Card from '../../../UI/Card/Card.component';
import Spacer from '../../../UI/Spacer/Spacer.component';
import { Routes } from '../../../utils/enums';

import RoomTable from '../RoomTable/RoomTable.component';
import { JoiningRoomProps } from './JoiningRoom.props';

function JoiningRoom({
  roomID, setRoomID, roomList, socket, setShouldDisplayUsernameInput,
}: JoiningRoomProps) {
  const { isLoggedIn } = useGetSelf();
  const ROOT_URL = process.env.FRONTEND_URL || 'http://localhost:3000';
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
      router.push(`${ROOT_URL}${Routes.MULTIGAMING}/${payload}`);
    });
  }

  return (
    <Card width="500" shadowed>
      <h3 className='text-center'>Rejoindre une partie</h3>
      <RoomTable setRoomName={setRoomID} data={roomList} />
      <Spacer h="20" />
      <Button
        onClick={() => roomID && router.push(`${ROOT_URL}/multigaming/${btoa(`${roomID}`)}`)}
        disabled={!roomID}
        text="Rejoindre une partie"
      />
      <Spacer h="10" />
      <Button
        disabled={!!roomID}
        secondary
        onClick={() => createGameRoom()}
        text="Créer une partie"
      />
      {!isLoggedIn && (
      <Button
        onClick={() => setShouldDisplayUsernameInput(true)}
        light
        color={theme.primary}
        text="Je change mon pseudo"
      />
      )}
    </Card>
  );
}

export default JoiningRoom;
