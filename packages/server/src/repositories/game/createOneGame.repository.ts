import { Game } from '@prisma/client';
import { prisma } from '../../client';

export async function createOneGame(args: Game) {
  return prisma.game.create({
    data: args,
    select: {
      id: true,
    },
  });
}
