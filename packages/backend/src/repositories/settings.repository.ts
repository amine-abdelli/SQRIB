import { Settings } from '@prisma/client';
import { prisma } from '../client';

export function updateUserSettingsRepository(userId: string, data: Partial<Settings>) {
  return prisma.settings.update({
    where: {
      user_id: userId,
    },
    data: {
      ...data,
    },
  });
}
