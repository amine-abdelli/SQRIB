import { useMutation, UseMutationOptions, UseMutationResult } from 'react-query';
import { CreateUserRequestBody, CreateUserResponseBody } from '@sqrib/shared';
import { apiService } from '../api';
import { endpoints } from '..';

export const CREATE_USER = 'CREATE_USER';

export function useCreateUser(
  mutationOptions: UseMutationOptions<CreateUserResponseBody, unknown, CreateUserRequestBody> = {}
): UseMutationResult<CreateUserResponseBody, unknown, CreateUserRequestBody> {
  return useMutation(
    [CREATE_USER],
    async (requestBody: CreateUserRequestBody) => {
      const response = await apiService.post<CreateUserResponseBody>(endpoints.createUser, requestBody);
      return response.data;
    },
    mutationOptions,
  );
}
