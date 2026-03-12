import { IUpdateNickname } from '../../resolvers/settings/updateNickname.mutation';
import { Context } from '../../utils/context.utils';

export function updateNicknameByUserId({ nickname }: IUpdateNickname, { prisma, userId }: Context) {
  return prisma.user.update({
    where: { id: userId },
    data: {
      nickname,
    },
  });
}
