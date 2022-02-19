import { PrismaClient } from '@prisma/client';

interface ICreateAllSets {
  letter: string
  level: number
  wordSet: string[]
}

export async function createAllSets(args: ICreateAllSets, prisma: PrismaClient) {
  const set = await prisma.wordSet.create({
    data: args,
  });
  return set;
}
