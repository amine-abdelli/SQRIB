import { Button, StyledSpacer } from '@nextui-org/react';
import React from 'react';
import CreateModal from '../CreateModal/CreateModal.component';
import RoomTable from '../RoomTable/RoomTable.component';
import { JoiningRoomProps } from './JoiningRoom.props';

function JoiningRoom({
  roomID, setRoomID, roomList, setHasJoined,
  isCreateModalOpen, setIsCreateModalOpen,
  username, gameParameters, setGameParameters,
}: JoiningRoomProps) {
  return (
    <div className='w100'>
      <h3 className='text-center'>Rejoindre une partie</h3>
      <RoomTable setRoomName={setRoomID} data={roomList} />
      <Button
        className='w100'
        animated
        onClick={() => setHasJoined(true)}
        disabled={!roomID}
      >
        rejoindre une partie
      </Button>
      <StyledSpacer />
      <Button
        animated
        className='w100'
        onClick={() => setIsCreateModalOpen(true)}
      >
        Créer une partie
      </Button>
      <CreateModal
        isVisible={isCreateModalOpen}
        setIsVisible={setIsCreateModalOpen}
        setRoomID={setRoomID}
        setHasJoined={setHasJoined}
        username={username}
        setGameParameters={setGameParameters}
        gameParameters={gameParameters}
      />
    </div>
  );
}

export default JoiningRoom;
