import { PrismaClient } from '@prisma/client';

export function findManyScoresByUserId({ userId }: { userId: string}, prisma: PrismaClient) {
  return prisma.score.findMany({
    where: {
      userId,
    },
  });
}
