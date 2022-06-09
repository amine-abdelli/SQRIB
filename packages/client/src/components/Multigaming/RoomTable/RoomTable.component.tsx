import React from 'react';
import { Table } from '@nextui-org/react';
import { RoomTableProps } from './RoomTable.props';

function RoomTable({ data, setRoomName }: RoomTableProps) {
  const fullRooms: string[] = ['99999'];
  return (
    <Table
      aria-label="Room list"
      css={{
        height: 'auto',
        minWidth: '100%',
        backgroundColor: 'white',
      }}
      bordered
      selectionMode="single"
      disabledKeys={fullRooms}
      onSelectionChange={(a: any) => setRoomName(a.currentKey)}
    >
      <Table.Header>
        <Table.Column>PARTIES</Table.Column>
        <Table.Column>LANGUE</Table.Column>
        <Table.Column>JOUEURS</Table.Column>
      </Table.Header>
      <Table.Body>
        {data.length
          ? data.map(({
            name, players, lang, id,
          }, i) => {
            if (players >= 5) fullRooms.push(name);
            return (
              <Table.Row key={id}>
                <Table.Cell>{name}</Table.Cell>
                <Table.Cell>{lang}</Table.Cell>
                <Table.Cell>{`${players}/5`}</Table.Cell>
              </Table.Row>
            );
          }) : (
            <Table.Row key="99999">
              <Table.Cell>Pas de partie en cours</Table.Cell>
              <Table.Cell>?</Table.Cell>
              <Table.Cell>0/5</Table.Cell>
            </Table.Row>
          )}
      </Table.Body>
    </Table>
  );
}

export default RoomTable;
