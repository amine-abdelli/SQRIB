import express, { Request, Response, NextFunction } from 'express';
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
export async function createOneUser({ body }: Request, res: Response, next: NextFunction) {
  try {
    const user = await createUserService(body);
    return res.status(200).json({ user });
  } catch (error) {
    return next(error);
  }
}

/**
 * Update one user
 * @route /update
 * @method PUT
 */
export async function updateOneUser({ body, ctx }: Request, res: Response, next: NextFunction) {
  try {
    const updatedUser = await updateUserByIdService(getUserIdFromContext(ctx!, res), body);
    return res.status(200).json({ user: updatedUser });
  } catch (error) {
    return next(error);
  }
}

/**
 * Get user's data
 * @route /me
 * @method GET
 */
export async function getUserData({ ctx }: Request, res: Response, next: NextFunction) {
  try {
    const user = await getUserByIdService(getUserIdFromContext(ctx!, res));
    return res.status(200).json(user);
  } catch (error) {
    return next(error);
  }
}

/**
 * Delete user and its related settings and palmares
 * @route /delete
 * @method DELETE
 */
export async function deleteOneUser({ body }: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = body;
    await deleteUserService(email, password);
    return res.status(200).json({ message: `User ${email} deleted successfully` });
  } catch (error) {
    return next(error);
  }
}

export default router;
