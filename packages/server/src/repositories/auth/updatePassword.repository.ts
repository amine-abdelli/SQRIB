import { Context } from '../../utils/context.utils';

export function updatePasswordByUserId(
  { password }: {password: string},
  { userId, prisma }: Context,
) {
  return prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      password,
    },
  });
}
