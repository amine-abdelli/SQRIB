export enum AUTH_ROUTES {
  LOGIN = '/login',
}

export enum MAIN_ROUTES {
  HOME = '/',
  TRAINING = '/training',
  LEARNING = '/learning',

  MULTIPLAYER = '/multiplayer',
  MULTIPLAYER_HOME = '',
  MULTIPLAYER_ROOM = 'room',
  MULTIPLAYER_SELECTION = 'room-selection',
  MULTIPLAYER_CREATE_SESSION = 'create',

  LEADERBOARD = '/leaderboard',
  SETTINGS = '/settings',
  PROFILE = '/profile',
  USER_PROFILE = '/profile/:username',
  EDIT_PROFILE = '/edit/profile',
}
