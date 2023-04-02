import { IUserCredential, formatEmail, log } from '@sqrib/shared';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { getTokenPayload } from '../utils';
import { getUserByEmailRepository, getUserByUsernameRepository } from '../repositories';
import { HttpError } from '../utils/error.utils';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS512',
} as jwt.SignOptions;

export async function loginService(userCredentials: IUserCredential) {
  const { username, email, password } = userCredentials;
  log.info('Logging user : ', email || username);
  if ((!username && !email) || !password) {
    throw new HttpError(400, 'Missing username, email or password');
  }
  let user;
  if (email) {
    user = await getUserByEmailRepository(formatEmail(email));
  } else if (username) {
    user = await getUserByUsernameRepository(username);
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
  return token;
}

export async function authTest(token: string) {
  const payload = getTokenPayload(token);
  return payload;
}
