import { prisma } from '../../client';

export interface ICreateUserArgs {
  email: string,
  password: string,
  nickname: string,
}

export function createOneUser(args: ICreateUserArgs) {
  return prisma.user.create({
    data: args,
    select: {
      id: true,
      email: true,
      nickname: true,
      avatar: true,
      is_active: true,
      last_password_reset: true,
      last_activity: true,
      created_at: true,
      settings: true,
    },
  });
}
