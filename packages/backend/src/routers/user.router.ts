import express from 'express';
import { withAuth } from '../middlewares/auth.middleware';
import * as UserController from '../controllers/user.controller';
import { ENDPOINTS } from '../routes';

const router = express.Router();

router.post(ENDPOINTS.user.create, UserController.createOneUser);
router.put(ENDPOINTS.user.update, ...withAuth(UserController.updateOneUser));
router.get(ENDPOINTS.user.me, ...withAuth(UserController.getUserData));
router.delete(ENDPOINTS.user.delete, ...withAuth(UserController.deleteOneUser));

export default router;
