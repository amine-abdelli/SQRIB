import { PrismaClient } from ".prisma/client";

export interface UpdateUserByIdArgs {
  id: string,
  data: {
    password?: string,
    lastPasswordReset?: Date,
    last_activity?: Date,
    is_active: boolean,
    name?: string
  }
}

export async function updateOneUserById({ id, data }: UpdateUserByIdArgs, prisma: PrismaClient) {
  return prisma.user.update({
    where: {
      id,
    },
    data,
  });
}