import { v4 as uuidv4 } from 'uuid';
import { pool } from '../../pg_client/client';
import { oneUserById } from './oneUserById.repository';

export interface ICreateUserArgs {
  email: string,
  password: string,
  nickname: string,
}

// export function createOneUser(args: ICreateUserArgs) {
//   return prisma.user.create({
//     data: args,
//     select: {
//       id: true,
//       email: true,
//       nickname: true,
//       avatar: true,
//       is_active: true,
//       lastPasswordReset: true,
//       last_activity: true,
//       createdAt: true,
//       brotherHoodId: true,
//       settings: true,
//     },
//   });
// }

export async function createOneUser({ email, password, nickname }: ICreateUserArgs) {
  const userId = uuidv4();
  const createOneUserQuery = `INSERT INTO public."User"(id, email, password, nickname)
    VALUES ('${userId}', '${email}', '${password}', '${nickname}');`;
  await pool.query(createOneUserQuery);
  const user = await oneUserById({ id: userId });
  return user;
}
