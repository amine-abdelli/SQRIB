import { log, settingsInputAllowedKeys } from '@sqrib/shared';
import { Request } from 'express';
import { validateObjectKeys } from '../utils/input.utils';
import { HttpError } from '../utils';

export async function updateUserSettingsService(
  req: Request,
) {
  log.info('Trying to update user settings !');
  if (!validateObjectKeys(req.body, settingsInputAllowedKeys)) {
    throw new HttpError(400, 'Invalid settings !');
  }
  // const updatedSettings = await updateUserSettingsRepository(req.userId, req.body);
  log.info('User settings updated !');
  return {};
}
