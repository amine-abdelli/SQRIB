import { PrismaClient } from '@prisma/client';
import { IFindOneSet } from '../../resolvers/didacticiel/findOneSet.query';

export async function findOneSet({ letter }: IFindOneSet, prisma: PrismaClient) {
  const wordSet = await prisma.wordSet.findMany({
    where: {
      letter,
    },
  });
  return wordSet;
}
