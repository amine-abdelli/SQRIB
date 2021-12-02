import { deleteUserService } from '../../services/auth/deleteUser.service';
import { Context } from '../../utils/context';

export interface deleteUserArgs {
  email: string,
  password: string,
}
async function deleteUser(parent: any, { email, password }: deleteUserArgs, context: Context) {
  try {
    console.info('Trying to delete a user', { email });
    await deleteUserService(email, password, context);
    console.log('User deletion successful', { email });
    return {
      message: `${email} deleted successfully`,
    };
  } catch (e) {
    console.error('Error deleting user', { email, error: e });
    throw e;
  }
}

export { deleteUser };
