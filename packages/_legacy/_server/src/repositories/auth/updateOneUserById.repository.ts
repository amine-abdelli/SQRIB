import { PrismaClient } from '@prisma/client';

export interface UpdateUserByIdArgs {
  id: string,
  data: {
    password?: string,
    nickname?: string,
    avatar?: string,
    rank?: string,
    xp?: number,
    last_password_reset?: Date,
    last_activity?: string, // iso string
    is_active?: boolean,
    brotherHoodId?: string,
    didacticiel_level?: number,
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
