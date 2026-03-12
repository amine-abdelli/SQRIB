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
    log.info({ email }, 'Trying to delete a user');
    if (!context.userId) {
      log.error({ email }, 'User could not be deleted');
      throw new ApolloError('User could not be deleted');
    }
    await deleteUserService(email, password, context);
    log.info({ email }, 'User deletion successful');
    return {
      message: `${email} deleted successfully`,
    };
  } catch (e) {
    log.error({ email, error: e }, 'Error deleting user');
    throw e;
  }
}

export { deleteUser };
