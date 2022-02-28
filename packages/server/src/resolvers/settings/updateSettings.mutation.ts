import { FontSizes, Languages } from '@aqac/utils/';
import { updateSettingsService } from '../../services/settings/updateSettings.service';
import { Context } from '../../utils/context.utils';

export interface IUpdateSettings {
  language: Languages;
  fontSize: FontSizes;
  theme: boolean;
  sound: boolean;
}

export async function updateSettings(parent: any, args: IUpdateSettings, context: Context) {
  const updatedSettings = await updateSettingsService(args, context);
  if (!updatedSettings) console.log('Settings could not be updated');
  return updatedSettings;
}
