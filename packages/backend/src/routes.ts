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
  },
  settings: {
    update: '/update',
  },
  game: {
    learning: '/learning',
    training: '/training',
    saveSoloScoring: '/save-solo-scoring',
  },
});

export const ROUTES = Object.freeze({
  user: '/user',
  auth: '/auth',
  settings: '/settings',
  game: '/game',
});
