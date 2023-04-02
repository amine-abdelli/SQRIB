import express from 'express';
import * as AuthController from '../controllers/auth.controller';
import { ENDPOINTS } from '../routes';

const router = express.Router();

router.post(ENDPOINTS.auth.login, AuthController.login);
// Need auth
router.post(ENDPOINTS.auth.logout, AuthController.logout);

export default router;
