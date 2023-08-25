import { useMutation, UseMutationOptions, UseMutationResult } from 'react-query';
import { ENDPOINTS, LoginUserResponseBody, ROUTES, UserCredential } from '@sqrib/shared';
import { apiService } from '../api';

export const LOGIN_USER = 'LOGIN_USER';

export function useLogin(
  mutationOptions: UseMutationOptions<LoginUserResponseBody, unknown, UserCredential> = {}
): UseMutationResult<LoginUserResponseBody, unknown, UserCredential> {
  return useMutation(
    [LOGIN_USER],
    async (requestBody: UserCredential) => {
      const response = await apiService.post<LoginUserResponseBody>(ROUTES.auth + ENDPOINTS.auth.login, requestBody);
      return response.data;
    },
    mutationOptions,
  );
}
