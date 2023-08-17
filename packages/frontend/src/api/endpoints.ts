export const endpoints = Object.freeze({
  /** GAME - TRAINING */
  // GET
  getTrainingWordChain: '/game/training',

  /** GAME - LEARNING */
  // GET
  getLearningWordChain: '/game/learning',
  
  /** USER */
  // POST
  createUser: '/user/create',
  // PUT
  updateUser: '/user/update',
  // DELETE
  deleteUser: '/user/delete',

  /** AUTHENTICATION */
  // GET
  getSelf: '/user/me',
  // POST
  login: '/auth/login',
  // POST
  logout: '/auth/logout',
});
