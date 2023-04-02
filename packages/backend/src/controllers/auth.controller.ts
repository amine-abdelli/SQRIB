import express, { Request, Response, NextFunction } from 'express';
import { authTest, loginService } from '../services/auth.service';

const router = express.Router();

/**
 * Login
 * @route /login
 * @method POST
 */
export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const token = await loginService(req.body);
    return res.status(200).json({ token });
  } catch (error) {
    return next(error);
  }
}

/**
 * Logout
 * @route /logout
 * @method POST
 */
export async function logout(req: Request, res: Response, next: NextFunction) {
  try {
    authTest(req.body.token);
    return res.status(200).json({ message: '' });
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
