import { Settings } from '@prisma/client';
import { Context } from '../../utils/context.utils';

export function createSettings(userId: string, { prisma }: Context): Promise<Settings> {
  return prisma.settings.create({
    data: {
      userId,
    },
  });
}
