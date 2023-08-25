/* eslint-disable max-len */
import { SaveTrainingScoreRequestModel, SaveTrainingSessionRequestModel } from '@sqrib/shared';
import { Score, Session } from '@prisma/client';
import { prisma } from '../client';

export function createSession(sessionData: SaveTrainingSessionRequestModel): Promise<Session> {
  return prisma.session.create({ data: sessionData });
}

export function createScore(scoreData: SaveTrainingScoreRequestModel): Promise<Score> {
  return prisma.score.create({ data: scoreData, include: { Session: true } });
}

export function deleteSession(sessionId: string): Promise<Session> {
  return prisma.session.delete({ where: { id: sessionId } });
}

export function getScoreByTypeAndUserId(userId: string, type: string): Promise<Score[]> {
  return prisma.score.findMany({
    where: {
      AND: [
        { Session: { type } },
        { user_id: userId },
      ],
    },
    include: {
      Session: true,
    },
  });
}
