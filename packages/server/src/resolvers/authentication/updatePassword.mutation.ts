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
  const updateMessage = await updatePasswordService(password, newPassword, context);
  return updateMessage;
}
