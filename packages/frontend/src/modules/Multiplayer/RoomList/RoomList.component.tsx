import React from 'react'

import Table from '../../../components/Table/Table.component';
import { roomListColumns } from '../../../components/Table/Columns';
import { Button } from '../../../components/Button/Button.component';
import { Spacer, SpacerSize } from '../../../components';
import { Card } from '../../../components/Card/Card.component';
import { Text } from '../../../components/Text/Text.component';
import { generatePath, useNavigate } from 'react-router-dom';
import { MAIN_ROUTES } from '../../../routes/paths';
import { useSocket } from '../../../contexts/SocketContext';
import { SocketPreGameEventsEnum } from '@sqrib/shared';
import { usePlayer } from '../../../contexts/PlayerContext';

interface RoomListProps {
  roomId: string;
  setRoomId: (roomId: string) => void;
  roomList: any[];
}

const RoomList = ({ roomId, setRoomId, roomList }: RoomListProps) => {
  const { emit, listen } = useSocket();
  const { username, color, avatar } = usePlayer();

  const isJoinButtonDisabled = !roomId || roomList.find((room) => room.id === roomId)?.players === 5;
  const navigate = useNavigate();

  function joinSession() {
    emit(SocketPreGameEventsEnum.JOIN_SESSION, roomId, { username, color, avatar })
  }

  listen(SocketPreGameEventsEnum.JOIN_SESSION, () => {
    navigate(generatePath(MAIN_ROUTES.MULTIPLAYER_ROOM, { roomId }))
  })

  function createSession() {
    navigate(MAIN_ROUTES.MULTIPLAYER_CREATE_SESSION)
  }

  return (
    <Card style={{ padding: '2rem', width: '50rem' }}>
      <Text h1 centered fira bold>SELECTION</Text>
      <Spacer y size={SpacerSize.SMALL} />
      <Table
        columns={roomListColumns() as any}
        dataSource={roomList}
        onRowClick={(e) => setRoomId(e.id as string)}
        emptyMessage="No session available"
        hoverableRow
        pagination={5}
      />
      <Spacer y size={SpacerSize.SMALL} />
      <Button disabled={isJoinButtonDisabled} onClick={joinSession}>
        Join a session
      </Button>
      <Spacer y size={SpacerSize.SMALL} />
      <Button secondary onClick={createSession}>
        Create a session
      </Button>
      <Spacer y size={SpacerSize.SMALL} />
      <Button secondary onClick={() => navigate(MAIN_ROUTES.MULTIPLAYER)}>
        Back
      </Button>
    </Card>
  )
};


export { RoomList }