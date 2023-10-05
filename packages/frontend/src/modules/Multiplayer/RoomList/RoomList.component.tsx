import React from 'react'

import Table from '../../../components/Table/Table.component';
import { roomListColumns } from '../../../components/Table/Columns';
import { Button } from '../../../components/Button/Button.component';
import { Spacer, SpacerSize } from '../../../components';
import { Card } from '../../../components/Card/Card.component';
import { Text } from '../../../components/Text/Text.component';
import { generatePath, useNavigate } from 'react-router-dom';
import { MAIN_ROUTES } from '../../../routes/paths';

// Mocks
const roomList = [
  {
    name: 'session 1',
    players: 3,
    lang: 'fr',
    id: '1',
    mode: 'Time trial',
  },
  {
    name: 'session 2',
    players: 2,
    lang: 'en',
    id: '2',
    mode: 'Speed challenge',
    word_count: 60
  },
  {
    name: 'session 3',
    players: 4,
    lang: 'en',
    id: '3',
    mode: 'Speed challenge',
    word_count: 60
  },
  {
    name: 'session 4',
    players: 5,
    lang: 'fr',
    id: '4',
    mode: 'Time trial'
  },
  {
    name: 'session 1',
    players: 3,
    lang: 'fr',
    id: '5',
    mode: 'Time trial',
  },
  {
    name: 'session 2',
    players: 2,
    lang: 'en',
    id: '6',
    mode: 'Speed challenge',
    word_count: 60
  },
  {
    name: 'session 3',
    players: 4,
    lang: 'en',
    id: '7',
    mode: 'Speed challenge',
    word_count: 60
  },
]

export function concatPath(root: string, endPath: string) {
  return root + '/' + endPath;
}
const RoomList = () => {
  const [roomId, setRoomId] = React.useState<string>('');
  const isJoinButtonDisabled = !roomId || roomList.find((room) => room.id === roomId)?.players === 5;
  const navigate = useNavigate();
  function joinSession() {
    navigate(generatePath(concatPath(MAIN_ROUTES.MULTIPLAYER, MAIN_ROUTES.MULTIPLAYER_ROOM)), { state: { roomId } })
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
      <Button secondary onClick={() => navigate(concatPath(MAIN_ROUTES.MULTIPLAYER, MAIN_ROUTES.MULTIPLAYER_CREATE_SESSION))}>
        Create a session
      </Button>
    </Card>
  )
};


export { RoomList }