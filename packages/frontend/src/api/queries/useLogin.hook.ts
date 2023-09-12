import { useMutation, UseMutationOptions, UseMutationResult } from 'react-query';
import { ENDPOINTS_FULL_PATH, LoginUserResponseBody, UserCredential } from '@sqrib/shared';
import { apiService } from '../api';

export const LOGIN_USER = 'LOGIN_USER';

export function useLogin(
  mutationOptions: UseMutationOptions<LoginUserResponseBody, unknown, UserCredential> = {}
): UseMutationResult<LoginUserResponseBody, unknown, UserCredential> {
  return useMutation(
    [LOGIN_USER],
    async (requestBody: UserCredential) => {
      const response = await apiService.post<LoginUserResponseBody>(ENDPOINTS_FULL_PATH.auth.login, requestBody);
      return response.data;
    },
    mutationOptions,
  );
}
