import { ISaveScoring } from '@sqrib/shared';
import { prisma } from '../client';

export function saveSoloScoringRepository({ score, game }: ISaveScoring) {
  return prisma.game.create({
    data: {
      ...game,
      scores: {
        create: {
          ...score,
        },
      },
    },
  });
}
