import { PrismaClient } from ".prisma/client";

export interface OneUserByIdArgs {
  id: string | undefined
}

export async function oneUserById({ id }: OneUserByIdArgs, prisma: PrismaClient) {
  return await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      scores: true,
      BrotherHood: true,
    },
  });
}