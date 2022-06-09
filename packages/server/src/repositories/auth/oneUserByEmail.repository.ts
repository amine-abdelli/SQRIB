import { PrismaClient } from '@prisma/client';

export interface OneUserByEmailArgs {
  email: string | undefined
}
export async function oneUserByEmail({ email }: OneUserByEmailArgs, prisma: PrismaClient) {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
}
