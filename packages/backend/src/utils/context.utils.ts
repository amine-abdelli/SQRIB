import { Request, Response, NextFunction } from 'express';
import { ContextData } from '../../custom.d';
import { HttpError } from './error.utils';

// Middleware to add context data to the request object
export function createContext(req: Request, res: Response, next: NextFunction) {
  // TODO get user id from cookie here
  req.ctx = {
    userId: '',
    // Add more context data here...
  };
  next();
}

/**
 * Extract the user Id from the context
 * @param ctx Context
 * @returns the user Id extracted from the context
 */
export function getUserIdFromContext(ctx: ContextData) {
  const userId = ctx?.userId;
  if (!userId) {
    throw new HttpError(401, 'Unauthorized access');
  }
  return userId;
}
