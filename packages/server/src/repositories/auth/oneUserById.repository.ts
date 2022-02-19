import { PrismaClient, User } from '@prisma/client';

export interface OneUserByIdArgs {
  id: string | undefined
}

export async function oneUserById({ id }: Pick<User, 'id'>, prisma: PrismaClient) {
  return prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      scores: true,
      BrotherHood: true,
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
