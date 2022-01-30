import { PrismaClient } from '@prisma/client';
import { ICreateOneSet } from '../../resolvers/didacticiel/createOneSet.mutation';

export async function createOneSet(
  args: ICreateOneSet
  & {wordSet: string[]},
  prisma: PrismaClient,
) {
  const set = await prisma.wordSet.create({
    data: args,
  });
  return set;
}
