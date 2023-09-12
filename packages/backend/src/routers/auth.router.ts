import express from 'express';
import { ENDPOINTS } from '@sqrib/shared';
import { withAuth } from '../middlewares/auth.middleware';
import * as AuthController from '../controllers/auth.controller';

const router = express.Router();
router.post(ENDPOINTS.auth.login, AuthController.login);
router.post(ENDPOINTS.auth.logout, ...withAuth(AuthController.logout));

export default router;
