/** Multiplayer */
export enum SocketPreGameEventsEnum {
  CREATE_SESSION = 'create-session',
  JOIN_SESSION = 'join-session',
  GET_SESSION_LIST = 'get-sessions',
  GET_PLAYERS = 'get-players',
  CHECK_SESSION_ID_VALIDITY = 'check-session-id-validity',
  GET_SESSION_INFO = 'get-session-info',
  START_SESSION = 'start-session',
  LEAVE_SESSION = 'leave-session',
}

export enum SocketInGameEventsEnum {

}

export enum SocketChoreEventsEnum {
  ERROR = 'error',
  PLAYER_NOTIFICATION = 'player-notification',
}
