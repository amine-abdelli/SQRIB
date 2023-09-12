export const ENDPOINTS_FULL_PATH = Object.freeze({
  user: {
    me: '/user/me',
    create: '/user/create',
    update: '/user/update',
    delete: '/user/delete',
    weekly_tracker: '/user/weekly-tracker',
    user_stats: '/user/user-stats',
    get_user_rank: '/user/get-user-rank',
    get_user_scores: '/user/get-user-scores',
  },
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
  },
  settings: {
    update: '/settings/update',
  },
  game: {
    learning: '/game/learning',
    training: '/game/training',
    save_scoring: '/game/save-scoring',
  },
  metrics: {
    get_global_metrics: '/metrics/get-global-metrics',
  },
});

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
  metrics: {
    get_global_metrics: '/get-global-metrics',
  },
});

export const ROUTES = Object.freeze({
  user: '/user',
  auth: '/auth',
  settings: '/settings',
  game: '/game',
  metrics: '/metrics',
});
