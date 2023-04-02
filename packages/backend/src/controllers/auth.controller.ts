import express, { Request, Response, NextFunction } from 'express';
import { loginService, logoutService } from '../services/auth.service';

const router = express.Router();

/**
 * Login
 * @route /login
 * @method POST
 */
export function login(req: Request, res: Response, next: NextFunction) {
  try {
    return loginService(req.body, res);
  } catch (error) {
    return next(error);
  }
}

/**
 * Logout
 * @route /logout
 * @method POST
 */
export async function logout(_: Request, res: Response, next: NextFunction) {
  try {
    return logoutService(res);
  } catch (error) {
    return next(error);
  }
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
