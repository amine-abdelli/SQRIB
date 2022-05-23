import { objectToQueryString } from '../../utils';
import { pool } from '../../pg_client/client';
import { oneUserById } from './oneUserById.repository';

export interface UpdateUserByIdArgs {
  id: string,
  data: {
    password?: string,
    nickname?: string,
    avatar?: string,
    rank?: string,
    xp?: number,
    lastPasswordReset?: Date,
    last_activity?: string, // iso string
    is_active?: boolean,
    brotherHoodId?: string,
    didacticiel_level?: number,
  }
}

export async function updateOneUserById({ id, data }: UpdateUserByIdArgs) {
  const updateUserQuery = `UPDATE public."User"
    SET ${objectToQueryString(data)}
    WHERE id = '${id}';`;
  await pool.query(updateUserQuery);
  const user = await oneUserById({ id });
  return user;
}
