import { prisma } from '../../client';

export function findManyGames() {
  return prisma.game.findMany();
}
