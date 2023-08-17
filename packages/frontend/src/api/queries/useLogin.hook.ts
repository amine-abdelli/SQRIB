import { useMutation, UseMutationOptions, UseMutationResult } from 'react-query';
import { LoginUserResponseBody, UserCredential } from '@sqrib/shared';
import { apiService } from '../api';
import { endpoints } from '..';

export const LOGIN_USER = 'LOGIN_USER';

export function useLogin(
  mutationOptions: UseMutationOptions<LoginUserResponseBody, unknown, UserCredential> = {}
): UseMutationResult<LoginUserResponseBody, unknown, UserCredential> {
  return useMutation(
    [LOGIN_USER],
    async (requestBody: UserCredential) => {
      const response = await apiService.post<LoginUserResponseBody>(endpoints.login, requestBody);
      return response.data;
    },
    mutationOptions,
  );
}
