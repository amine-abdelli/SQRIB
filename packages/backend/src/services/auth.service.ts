import {
  UserCredential, formatEmail, log, emailPolicy,
} from '@sqrib/shared';
import { Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { COOKIE_SETTINGS, HttpError } from '../utils';
import { getUserByEmailRepository, getUserByUsernameRepository, updateUserByIdRepository } from '../repositories';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS512',
} as jwt.SignOptions;

export async function loginService(userCredentials: UserCredential, res: Response) {
  const { email: emailOrUsername, password } = userCredentials;
  const isEmail = emailPolicy.test(emailOrUsername || '');
  log.info('Logging user : ', { user: emailOrUsername });
  if ((!emailOrUsername) || !password) {
    throw new HttpError(400, 'Missing username, email or password');
  }
  let user;
  if (emailOrUsername && isEmail) {
    user = await getUserByEmailRepository(formatEmail(emailOrUsername));
  } else if (emailOrUsername) {
    user = await getUserByUsernameRepository(emailOrUsername);
  }
  const isPasswordValid = await bcrypt.compare(password, user?.password || '');
  if (!user || !isPasswordValid) {
    throw new HttpError(401, 'Incorrect email or password');
  }
  const JWT_TOKEN_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
  const token = jwt.sign(
    { userId: user.id },
    JWT_TOKEN_SECRET,
    jwtConfig,
  );
  if (!token) {
    throw new HttpError(500, 'An error occurred while generating token');
  }
  await updateUserByIdRepository(user.id, { last_activity: new Date() });
  log.info('User successfully logged in : ', { user: emailOrUsername });
  return res.status(200).cookie('session_id', token, COOKIE_SETTINGS).send({ message: 'User logged in !' });
}

export function logoutService(res: Response) {
  log.info('Trying to logout user !');
  res.clearCookie('session_id', COOKIE_SETTINGS).send({ message: 'User logged out !' });
  log.info('User successfully logged out');
}
