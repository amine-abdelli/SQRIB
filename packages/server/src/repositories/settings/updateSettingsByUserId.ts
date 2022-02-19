import { Context } from '../../utils/context.utils';
import { IUpdateSettings } from '../../resolvers/settings/updateSettings.mutation';

export function updateSettingsByUserId(args: IUpdateSettings, { prisma, userId }: Context) {
  return prisma.settings.update({
    where: {
      userId,
    },
    data: {
      ...args,
    },
  });
}
