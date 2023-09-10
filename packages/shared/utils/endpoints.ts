export const ENDPOINTS = Object.freeze({
  user: {
    me: '/me',
    create: '/create',
    update: '/update',
    delete: '/delete',
    weekly_tracker: '/weekly-tracker',
    user_stats: '/user-stats',
    get_user_rank: '/get-user-rank',
    get_user_scores: '/get-user-scores',
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
    save_scoring: '/save-scoring',
  },
});

export const ROUTES = Object.freeze({
  user: '/user',
  auth: '/auth',
  settings: '/settings',
  game: '/game',
});
