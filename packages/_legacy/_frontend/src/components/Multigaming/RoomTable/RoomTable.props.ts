interface IRoom {
  name: string;
  players: number;
  lang: string;
  id: string;
}

export interface RoomTableProps {
  data: IRoom[];
  setRoomName: (key: string) => void;
}
