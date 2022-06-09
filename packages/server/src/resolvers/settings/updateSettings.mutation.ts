import { FontSizes, Languages, log } from '@aqac/utils/';
import { ApolloError } from 'apollo-server-errors';
import { updateSettingsService } from '../../services/settings/updateSettings.service';
import { Context } from '../../utils/context.utils';

export interface IUpdateSettings {
  language: Languages;
  font_size: FontSizes;
  theme: boolean;
  sound: boolean;
}

export async function updateSettings(parent: any, args: IUpdateSettings, context: Context) {
  log.info('trying to update settings', { id: context.userId });
  const updatedSettings = await updateSettingsService(args, context);
  if (!updatedSettings) {
    log.error('Settings could not be updated');
    throw new ApolloError('Settings could not be updated');
  }
  log.info('Settings updated successfully', { id: context.userId });
  return updatedSettings;
}
