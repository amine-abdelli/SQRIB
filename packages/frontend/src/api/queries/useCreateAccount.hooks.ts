import { useMutation, UseMutationOptions, UseMutationResult } from 'react-query';
import { CreateUserRequestBody, CreateUserResponseBody, ENDPOINTS, ROUTES } from '@sqrib/shared';
import { apiService } from '../api';

export const CREATE_USER = 'CREATE_USER';

export function useCreateUser(
  mutationOptions: UseMutationOptions<CreateUserResponseBody, unknown, CreateUserRequestBody> = {}
): UseMutationResult<CreateUserResponseBody, unknown, CreateUserRequestBody> {
  return useMutation(
    [CREATE_USER],
    async (requestBody: CreateUserRequestBody) => {
      const response = await apiService.post<CreateUserResponseBody>(ROUTES.user + ENDPOINTS.user.create, requestBody);
      return response.data;
    },
    mutationOptions,
  );
}
