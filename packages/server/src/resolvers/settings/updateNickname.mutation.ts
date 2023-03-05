import { log } from '@sqrib/utils';
import { ApolloError } from 'apollo-server-errors';
import { updateNicknameService } from '../../services/settings/updateNickname.service';
import { Context } from '../../utils/context.utils';

export interface IUpdateNickname {
  nickname: string;
}
export async function updateNickname(parent: any, args: IUpdateNickname, context: Context) {
  log.info({ id: context.userId }, 'trying to update nickname');
  const { nickname } = await updateNicknameService(args, context);

  if (!nickname) {
    log.error('Nickname could not be updated', { id: context.userId });
    throw new ApolloError('Nickname could not be updated');
  }
  log.info({ id: context.userId }, 'Nickname updated successfully');
  return nickname;
}
