import { NextFunction, Request, Response } from 'express';

export function accessMiddleware(req: Request, res: Response, next: NextFunction) {
  const clientIp = req.ip; // Get client IP
  const allowedIps = ['18.156.158.53', '18.156.42.200', '52.59.103.54']; // Replace with your list of IPs
  if (process.env.NODE_ENV !== 'development') {
    if (allowedIps.includes(clientIp)) {
      next();
    } else {
      res.status(403).send('You are not allowed to perform this action !');
    }
  } else {
    next();
  }
}
