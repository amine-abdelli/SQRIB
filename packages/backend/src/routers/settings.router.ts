import * as SettingsController from '../controllers/settings.controller';
import { ENDPOINTS } from '../routes';

const express = require('express');

const router = express.Router();

router.put(ENDPOINTS.settings.update, SettingsController.updateUserSettings);

export default router;
