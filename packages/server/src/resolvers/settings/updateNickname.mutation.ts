import { log } from '@aqac/utils';
import { ApolloError } from 'apollo-server-errors';
import { updateNicknameService } from '../../services/settings/updateNickname.service';
import { Context } from '../../utils/context.utils';

export interface IUpdateNickname {
  nickname: string;
}
export async function updateNickname(parent: any, args: IUpdateNickname, context: Context) {
  log.info('trying to update nickname', { id: context.userId });
  const { nickname } = await updateNicknameService(args, context);

  if (!nickname) {
    log.error('Nickname could not be updated', { id: context.userId });
    throw new ApolloError('Nickname could not be updated');
  }
  log.info('Nickname updated successfully', { id: context.userId });
  return nickname;
}
