import { Request, Response, NextFunction } from 'express';
import { ContextData } from '../../custom.d';

// Middleware to add context data to the request object
export function createContext(req: Request, res: Response, next: NextFunction) {
  // TODO get user id from cookie here
  req.ctx = {
    userId: '3379dab7-465b-49b6-aab0-37b495b5d6d6' || '',
    // Add more context data here
  };
  next();
}

export function getUserIdFromContext(ctx: ContextData, res: Response) {
  const userId = ctx?.userId;
  if (!userId) {
    res.status(401).json({ message: 'Unauthorized' });
    throw new Error('Unauthorized');
  }
  return userId;
}
