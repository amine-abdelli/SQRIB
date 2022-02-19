import { updateNicknameService } from '../../services/settings/updateNickname.service';
import { Context } from '../../utils/context.utils';

export interface IUpdateNickname {
  nickname: string;
}
export async function updateNickname(parent: any, args: IUpdateNickname, context: Context) {
  console.log('tryin to update nickname', { id: context.userId });
  const { nickname } = await updateNicknameService(args, context);

  if (!nickname) console.log('Settings could not be updated');
  console.log('nickname updated successfully');
  return nickname;
}
