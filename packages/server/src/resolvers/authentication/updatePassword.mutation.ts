import { log } from '@sqrib/utils';
import { updatePasswordService } from '../../services/auth/updatePassword.service';
import { Context } from '../../utils/context.utils';

export interface IUpdatePassword {
  password: string;
  newPassword: string;
}

export async function updatePassword(
  parent: any,
  { password, newPassword }: IUpdatePassword,
  context: Context,
) {
  log.info('Trying to update password', { userId: context.userId });
  const updateMessage = await updatePasswordService(password, newPassword, context);
  log.info('Password updated successfully', { userId: context.userId });
  return updateMessage;
}
