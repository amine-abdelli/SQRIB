import { log, settingsInputAllowedKeys } from '@sqrib/shared';
import { Request } from 'express';
import { validateObjectKeys } from '../utils/input.utils';

export async function updateUserSettingsService(
  req: Request,
) {
  log.info('Trying to update user settings !');
  validateObjectKeys(req.body, settingsInputAllowedKeys);
  // const updatedSettings = await updateUserSettingsRepository(req.userId, req.body);
  log.info('User settings updated !');
  return {};
}
