import express from 'express';
import * as UserController from '../controllers/user.controller';
import { ENDPOINTS } from '../routes';

const router = express.Router();

router.post(ENDPOINTS.user.create, UserController.createOneUser);
router.put(ENDPOINTS.user.update, UserController.updateOneUser);
router.get(ENDPOINTS.user.me, UserController.getUserData);
router.delete(ENDPOINTS.user.delete, UserController.deleteOneUser);

export default router;
