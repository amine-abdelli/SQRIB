import { User } from '@prisma/client';
import { pool } from '../../pg_client/client';

export interface OneUserByIdArgs {
  id: string | undefined
}

// export async function oneUserById({ id }: Pick<User, 'id'>, prisma: PrismaClient) {
//   return prisma.user.findUnique({
//     where: {
//       id,
//     },
//     include: {
//       scores: true,
//       BrotherHood: true,
//       settings: {
//         select: {
//           language: true,
//           theme: true,
//           sound: true,
//           fontSize: true,
//         },
//       },
//     },
//   });
// }

export async function oneUserById({ id }: Pick<User, 'id'>) {
  const fetchOneUserQuery = `
  SELECT * FROM public."User"
  WHERE id = '${id}';`;
  const user = await pool.query(fetchOneUserQuery);
  return user?.rows[0];
}
