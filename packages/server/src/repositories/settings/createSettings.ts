import { Context } from '../../utils/context.utils';

export function createSettings(userId: string, { prisma }: Context) {
  return prisma.settings.create({
    data: {
      userId,
    },
  });
}
