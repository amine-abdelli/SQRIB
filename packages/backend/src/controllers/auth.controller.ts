import express, { Request, Response } from 'express';

const router = express.Router();

/**
 * Login
 * @route /login
 * @method POST
 */
export async function login(req: Request, res: Response) {
  res.json({ res: 'login' });
}

/**
 * Logout
 * @route /logout
 * @method POST
 */
export async function logout(req: Request, res: Response) {
  res.json({ res: 'logout' });
}

/**
 * Refresh token
 * @route /refresh-token
 * @method POST
 */
export async function refreshToken(req: Request, res: Response) {
  res.json({ res: 'refresh token' });
}

export default router;
