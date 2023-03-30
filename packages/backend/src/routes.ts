export const ENDPOINTS = Object.freeze({
  user: {
    me: '/me',
    create: '/create',
    update: '/update',
    delete: '/delete',
  },
  auth: {
    login: '/login',
    logout: '/logout',
    refreshToken: '/refresh-token',
  },
  settings: {
    update: '/update',
  },
  game: {
    games: '/games',
  },
});

export const ROUTES = Object.freeze({
  user: '/user',
  auth: '/auth',
  settings: '/settings',
  game: '/game',
});
