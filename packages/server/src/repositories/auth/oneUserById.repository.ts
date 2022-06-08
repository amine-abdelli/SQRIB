import { User } from '@prisma/client';
import { prisma } from '../../client';

export interface OneUserByIdArgs {
  id: string | undefined
}

export async function oneUserById({ id }: Pick<User, 'id'>) {
  return prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      scores: true,
      settings: {
        select: {
          language: true,
          theme: true,
          sound: true,
          fontSize: true,
        },
      },
    },
  });
}
