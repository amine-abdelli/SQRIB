interface IRoom {
  name: string;
  players: number;
  lang: string;
}

export interface RoomTableProps {
  data: IRoom[];
  setRoomName: (key: string) => void;
}
