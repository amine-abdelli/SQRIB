import { PrismaClient } from '@prisma/client';
import { IUpdateLevel } from '../../resolvers/didacticiel/updateLevel.mutation';

export async function updateLevel(args: IUpdateLevel & { id: string}, prisma: PrismaClient) {
  const updatedLevel = await prisma.user.update({
    where: { id: args.id },
    data: {
      didacticiel_level: args.level,
    },
  });
  return updatedLevel;
}
