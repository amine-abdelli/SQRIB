import express, { Request, Response } from 'express';
import { getUserIdFromContext } from '../utils/context.utils';
import {
  createUserService, deleteUserService, getUserByIdService, updateUserByIdService,
} from '../services/user.service';

const router = express.Router();

/**
 * Create a user and its related default settings and palmares
 * @route /create
 * @method POST
 */
export async function createOneUser({ body }: Request, res: Response) {
  const { email, username, password } = body;
  const user = await createUserService({ email, username, password });
  res.status(200).json({ res: user });
}

/**
 * Update one user
 * @route /update
 * @method PUT
 */
export async function updateOneUser({ body }: Request, res: Response) {
  const { userId, data } = body;
  const updatedUser = await updateUserByIdService(userId, data);
  res.status(200).json({ res: updatedUser });
}

/**
 * Get user
 * @route /me
 * @method GET
 */
export async function getUserData({ ctx }: Request, res: Response) {
  // eslint-disable-next-line prefer-destructuring
  const userId = getUserIdFromContext(ctx!, res);
  const user = await getUserByIdService(userId);
  res.status(200).json(user);
}

/**
 * Delete user and its related settings and palmares
 * @route /delete
 * @method DELETE
 */
export async function deleteOneUser({ ctx }: Request, res: Response) {
  const userId = getUserIdFromContext(ctx!, res);
  const user = await getUserByIdService(userId);
  if (!user) {
    res.status(404).json({ message: `User ${userId} not found !` });
  }
  await deleteUserService(userId);
  res.status(200).json({ message: `User ${userId} deleted successfully` });
}

export default router;
