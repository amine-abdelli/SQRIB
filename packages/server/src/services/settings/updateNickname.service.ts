import { updateNicknameByUserId } from '../../repositories/settings/updateNicknameByUserId';
import { IUpdateNickname } from '../../resolvers/settings/updateNickname.mutation';
import { Context } from '../../utils/context.utils';

export async function updateNicknameService(args: IUpdateNickname, context: Context) {
  const nickname = await updateNicknameByUserId(args, context);
  return nickname;
}
