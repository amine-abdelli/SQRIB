import { PrismaClient } from '.prisma/client';

export async function oneScoreById(args: any, { prisma }: { prisma: PrismaClient}) {
  return prisma.score.create({
    data: args,
    select: {
      id: true,
      timing: true,
      mpm: true,
      wrong_words: true,
      correct_letters: true,
      total_letters: true,
      wrong_letters: true,
      precision: true,
      points: true,
      game_mode: true,
      createdAt: true,
    },
  });
}
