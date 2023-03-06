import React from 'react';
import Table from '../../../UI/Table/Table.component';
import { useColumns } from '../../LeaderBoard/useColumns.hook';
import { RoomTableProps } from './RoomTable.props';

function RoomTable({ data, setRoomName }: RoomTableProps) {
  return (
    <Table
      columns={useColumns().roomTableColumns() as any}
      dataSource={data}
      onRowClick={(e) => setRoomName(e.id as string)}
      emptyMessage="Pas de partie en cours"
      hoverableRow
      pagination={5}
    />
  );
}

export default RoomTable;
