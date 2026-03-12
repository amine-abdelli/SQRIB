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
  SESSION_PROGRESSION = 'session-progression',
  UPDATE_PLAYER_PROGRESS = 'update-player-progress',
  GAME_COUNTDOWN = 'game-countdown',
  GAME_ENDED = 'game-ended',
}

export enum SocketCommonEventsEnum {
  LAUNCH_TIMER = 'launch-timer',
  STOP_TIMER = 'stop-timer',
}

export enum SocketChoreEventsEnum {
  ERROR = 'error',
  PLAYER_NOTIFICATION = 'player-notification',
}
