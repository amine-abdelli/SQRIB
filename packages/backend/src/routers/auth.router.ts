import express from 'express';
import * as AuthController from '../controllers/auth.controller';
import { ENDPOINTS } from '../routes';

const router = express.Router();

router.post(ENDPOINTS.auth.login, AuthController.login);
// Need auth
router.post(ENDPOINTS.auth.logout, AuthController.logout);
// Need auth
router.post(ENDPOINTS.auth.refreshToken, AuthController.refreshToken);

export default router;
