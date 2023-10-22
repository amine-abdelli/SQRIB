export enum AUTH_ROUTES {
  LOGIN = '/login',
}

export enum MAIN_ROUTES {
  HOME = '/',
  TRAINING = '/training',
  LEARNING = '/learning',

  MULTIPLAYER = '/multiplayer',
  MULTIPLAYER_HOME = '',
  MULTIPLAYER_SELECTION = '/multiplayer/room-selection',
  MULTIPLAYER_CREATE_SESSION = '/multiplayer/create',
  MULTIPLAYER_STAGING = '/multiplayer/staging/:roomId',
  MULTIPLAYER_ROOM = '/multiplayer/room/:roomId',

  LEADERBOARD = '/leaderboard',
  SETTINGS = '/settings',
  PROFILE = '/profile',
  USER_PROFILE = '/profile/:username',
  EDIT_PROFILE = '/edit/profile',
}
