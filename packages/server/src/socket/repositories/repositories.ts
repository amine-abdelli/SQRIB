import { Database_manager } from '@aqac/db';

const db = new Database_manager();

export const Repositories = {
  /**
    * Returns all the scores played since day 1
   */
  findManyScores() {
    return db.findManyScores();
  },
  /**
   * Returns all the games played since day 1
   */
  findManyGames() {
    return db.findManyGames();
  },
  /**
   * Create one user score
   */
  createOneScore(args: any) {
    return db.createOneScore(args);
  },
  /**
   * Create one game
   */
  createOneGame(args: any) {
    return db.createOneGame(args);
  },
  /**
   * Create one player
   */
  createOnePlayer(args: any) {
    return db.createOnePlayer(args);
  },
};
