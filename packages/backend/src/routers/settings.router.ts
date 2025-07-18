import express from 'express';
import { ENDPOINTS } from '@sqrib/shared';
import { withAuth } from '../middlewares/auth.middleware';
import * as SettingsController from '../controllers/settings.controller';

const router = express.Router();

router.put(ENDPOINTS.settings.update, ...withAuth(SettingsController.updateUserSettings));

export default router;
