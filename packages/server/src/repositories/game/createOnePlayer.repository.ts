import { Player } from '@prisma/client';
import { prisma } from '../../client';

export async function createOnePlayer(args: Player) {
  return prisma.player.create({
    data: args,
    select: {
      id: true,
    },
  });
}
