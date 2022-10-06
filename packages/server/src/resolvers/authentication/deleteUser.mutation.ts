import { log } from '@sqrib/utils';
import { ApolloError } from 'apollo-server-errors';
import { deleteUserService } from '../../services/auth/deleteUser.service';
import { Context } from '../../utils/context.utils';

export interface deleteUserArgs {
  email: string,
  password: string,
}
async function deleteUser(parent: any, { email, password }: deleteUserArgs, context: Context) {
  try {
    log.info('Trying to delete a user', { email });
    if (!context.userId) {
      log.error('User could not be deleted');
      throw new ApolloError('User could not be deleted');
    }
    await deleteUserService(email, password, context);
    log.info('User deletion successful', { email });
    return {
      message: `${email} deleted successfully`,
    };
  } catch (e) {
    log.error('Error deleting user', { email, error: e });
    throw e;
  }
}

export { deleteUser };
