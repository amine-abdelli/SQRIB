import {
  Request, Response, NextFunction, RequestHandler,
} from 'express';
import jwt from 'jsonwebtoken';
import { HttpError } from '../utils';

interface DecodedToken {
  userId: string;
  iat: number;
  exp: number;
}

function authMiddleware(req: Request, _: Response, next: NextFunction) {
  // Get the Bearer token from the request header
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    throw new HttpError(401, 'Missing Bearer token in header');
  }

  // Verify and decode the Bearer token
  jwt.verify(token, process.env.JWT_SECRET as string, (err, decodedToken) => {
    if (err) throw new HttpError(403, 'Invalid or expired token');
    // Extract the userId from the decoded token and attach it to the request object
    req.userId = (decodedToken as DecodedToken).userId;
    return next();
  });
}

// eslint-disable-next-line max-len
const withAuth = (handler: RequestHandler): RequestHandler[] => [authMiddleware, handler];

export { authMiddleware, withAuth };
