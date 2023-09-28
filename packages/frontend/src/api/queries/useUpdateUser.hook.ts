import { UseMutationOptions, UseMutationResult, useMutation } from "react-query";
import { apiService } from "../api";
import { ENDPOINTS_FULL_PATH, UpdateUserRequestBody, UpdateUserResponseBody } from "@sqrib/shared";

const UPDATE_USER = 'UPDATE_USER';

export function useUpdateUser(
  mutationOptions: UseMutationOptions<UpdateUserResponseBody, unknown, UpdateUserRequestBody> = {}
): UseMutationResult<UpdateUserResponseBody, unknown, UpdateUserRequestBody> {
  return useMutation(
    [UPDATE_USER],
    async (requestBody: UpdateUserRequestBody) => {
      const response = await apiService.put<UpdateUserResponseBody>(ENDPOINTS_FULL_PATH.user.update, requestBody);
      return response.data;
    },
    mutationOptions
  )
}