import express, { Request, Response, NextFunction } from 'express';
import { updateUserSettingsService } from '../services/settings.service';

const router = express.Router();

/**
 * Update user settings
 * @route /update
 * @method PUT
 */
export async function updateUserSettings(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const updatedSettings = await updateUserSettingsService(req);
    return res.status(200).json(updatedSettings);
  } catch (error) {
    return next(error);
  }
}

export default router;
