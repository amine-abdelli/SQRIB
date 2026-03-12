import { PrismaClient } from '@prisma/client';
import { ICreateOneSet } from '../../services/didacticiel/createOneSet.service';

export async function createOneSet(
  args: ICreateOneSet
    & { word_set: string[] },
  prisma: PrismaClient,
) {
  const set = await prisma.wordSet.create({
    data: args,
  });
  return set;
}
