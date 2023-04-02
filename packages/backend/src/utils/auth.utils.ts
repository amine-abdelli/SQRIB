import jwt from 'jsonwebtoken';
import { CookieOptions } from 'express';

const ONE_WEEK_IN_SECONDS = 7 * 24 * 60 * 60;

// export interface Token {
//   expiresIn: number
//   emittedAt: number
//   userId: string
// }

export function isTokenExpired(expiresIn: number, emittedAt: number) {
  return Date.now() > ((expiresIn * 1000) + emittedAt);
}

// export async function getUserId(req: express.Request, res: express.Response) {
//   const token = req.cookies.session_id;
//   if (token) {
//     const { userId, expiresIn, emittedAt } = getTokenPayload(token);
//     if (isTokenExpired(expiresIn, emittedAt)) {
//       res.clearCookie('session');
//       log.warn('Session expired');
//       throw new AuthenticationError('Session expired');
//     }
//     const user = await oneUserById({ id: userId });
//     if (!user) {
//       res.clearCookie('session');
//       log.warn('Session expired');
//       throw new AuthenticationError('Session expired');
//     }
//     return userId;
//   }
//   return '';
// }

// export interface LoginVariables {
//   email: string,
//   password: string
// }

// export async function authenticateUser({ email, password }: LoginVariables, context: Context) {
//   const user = await oneUserByEmail({ email: formatEmail(email) }, context.prisma);
//   const valid = await bcrypt.compare(password, user?.password || '');
//   if (!user || !valid) {
//     log.warn('Incorrect email or password');
//     throw new UserInputError('Incorrect email or password');
//   }
//   return user;
// }

export function getTokenPayload(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET || '');
}

export const COOKIE_SETTINGS: CookieOptions = {
  // cookie is valid for all subpaths of my domain
  path: '/',
  // this cookie won't be readable by the browser
  httpOnly: true,
  // and won't be usable outside of my domain
  sameSite: 'none',
  // HTTPS?
  secure: true,
};
