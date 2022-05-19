import { ApolloError } from 'apollo-server-errors';
import { log } from '@aqac/utils';
import { Context } from '../../utils/context.utils';
import { IUpdateSettings } from '../../resolvers/settings/updateSettings.mutation';
import { updateSettingsByUserId } from '../../repositories/settings/updateSettingsByUserId';

export async function updateSettingsService(
  args: IUpdateSettings,
  context: Context,
) {
  try {
    const settings = await updateSettingsByUserId(args, context);
    return settings;
  } catch (error: unknown) {
    log.error('Error while fetching settings', '', { error });
    throw new ApolloError('Error while fetching settings', '', { error });
  }
}
