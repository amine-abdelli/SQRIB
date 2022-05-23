import { v4 as uuidv4 } from 'uuid';
import { pool } from '../../pg_client/client';

// export function createSettings(userId: string, { prisma }: Context) {
//   return prisma.settings.create({
//     data: {
//       userId,
//     },
//   });
// }

export async function createSettings(userId: string) {
  const id = uuidv4();
  const createUserSettingsQuery = `INSERT INTO public."Settings"(id, "userId")
    VALUES (${id}, '${userId}');`;
  const createdSettings = await pool.query(createUserSettingsQuery);
  return createdSettings;
}
