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
  log.info({ userId: context.userId }, 'Trying to update password');
  const updateMessage = await updatePasswordService(password, newPassword, context);
  log.info({ userId: context.userId }, 'Password updated successfully');
  return updateMessage;
}
