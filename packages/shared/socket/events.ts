/** Multiplayer */
export enum SocketPreGameEventsEnum {
  CREATE_SESSION = 'create-session',
  JOIN_SESSION = 'join-session',
  GET_SESSIONS = 'get-sessions',
  GET_PLAYERS = 'get-players',
  CHECK_SESSION_ID_VALIDITY = 'check-session-id-validity',
  GET_ROOM_INFO = 'get-room-info',
  START_SESSION = 'start-session',
}

export enum SocketInGameEventsEnum {

}

export enum SocketChoreEventsEnum {
  ERROR = 'error',
  PLAYER_NOTIFICATION = 'player-notification',
}
