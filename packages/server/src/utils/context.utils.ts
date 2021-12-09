import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import httpContext from 'express-http-context';
import { getUserId } from './auth.utils';
import { prisma } from '../client';

export interface Context {
  prisma: PrismaClient
  userId?: string
  res: Response
  req: Request
}

export async function createContext(context: any) {
  let userId;
  try {
    userId = context.req.cookies && await getUserId(context.req, context.res, prisma);
  } catch (e) {
    userId = '';
  }
  httpContext.set('userId', userId);

  return {
    ...context,
    prisma,
    userId,
  };
}
