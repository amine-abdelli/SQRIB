import express, { Request, Response } from 'express';

const router = express.Router();

/**
 * Get many games
 * @route /games
 * @method GET
 */
export async function getManyGames(req: Request, res: Response) {
  res.json({ res: 'games' });
}

export default router;
