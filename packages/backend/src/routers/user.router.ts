import express from 'express';
import * as UserController from '../controllers/user.controller';
import { ENDPOINTS } from '../routes';

const router = express.Router();

router.post(ENDPOINTS.user.create, UserController.createOneUser);
// Require auth
router.put(ENDPOINTS.user.update, UserController.updateOneUser);
// Require auth
router.get(ENDPOINTS.user.me, UserController.getUserData);
// Require auth
router.delete(ENDPOINTS.user.delete, UserController.deleteOneUser);

export default router;
