import { log } from '@sqrib/utils';
import { ApolloError, AuthenticationError } from 'apollo-server-errors';
import bcrypt from 'bcryptjs';
import { oneUserById, updateOneUserById } from '../../repositories';
import { Context } from '../../utils/context.utils';

export async function updatePasswordService(
  password: string,
  newPassword: string,
  context: Context,
) {
  try {
    log.info('Trying to update user password');
    const { userId, prisma } = context;
    if (!userId) {
      log.error('Could not update user password');
      throw new AuthenticationError('Could not update user password');
    }
    const user = await oneUserById({ id: userId });

    // Check if the current password is the right one. If not throw an error.
    const isPasswordValid = await bcrypt.compare(password, user?.password || '');
    if (!isPasswordValid) {
      log.error('The password input is not correct');
      throw new ApolloError('The password input is not correct');
    }

    // Check if the new password is the same as the one already set in the db
    const isNewPasswordIdentical = await bcrypt.compare(newPassword, user?.password || '');
    if (!isNewPasswordIdentical) {
      const newHashedPassword = await bcrypt.hash(newPassword, 10);
      await updateOneUserById({ id: userId, data: { password: newHashedPassword } }, prisma);
    }

    return { message: `Password updated successfully: ${user?.email}` };
  } catch (error: any) {
    log.error('Error while updating user password', { error });
    throw new ApolloError('Error while updating user password');
  }
}
