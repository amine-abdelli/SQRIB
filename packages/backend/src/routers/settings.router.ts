import express from 'express';
import { withAuth } from '../middlewares/auth.middleware';
import * as SettingsController from '../controllers/settings.controller';
import { ENDPOINTS } from '../routes';

const router = express.Router();

router.put(ENDPOINTS.settings.update, ...withAuth(SettingsController.updateUserSettings));

export default router;
