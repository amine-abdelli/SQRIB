import express from 'express';
import { ENDPOINTS } from '@sqrib/shared';
import { withAuth } from '../middlewares/auth.middleware';
import * as UserController from '../controllers/user.controller';

const router = express.Router();

router.post(ENDPOINTS.user.create, UserController.createOneUser);
router.put(ENDPOINTS.user.update, ...withAuth(UserController.updateOneUser));
router.get(ENDPOINTS.user.me, ...withAuth(UserController.getUserData));
router.delete(ENDPOINTS.user.delete, ...withAuth(UserController.deleteOneUser));
router.get(ENDPOINTS.user.weekly_tracker, ...withAuth(UserController.getUserWeeklyTracker));
router.get(ENDPOINTS.user.user_stats, ...withAuth(UserController.getUserStats));
router.get(ENDPOINTS.user.get_user_rank, ...withAuth(UserController.getUserRank));
router.get(ENDPOINTS.user.get_user_scores, ...withAuth(UserController.getUserScores));

export default router;
