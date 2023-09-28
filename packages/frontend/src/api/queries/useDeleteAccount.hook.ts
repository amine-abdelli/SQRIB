import { UseMutationOptions, UseMutationResult, useMutation } from "react-query";
import { apiService } from "../api";
import { DeleteUserAccountRequestBody, DeleteUserAccountResponseBody, ENDPOINTS_FULL_PATH } from "@sqrib/shared";

const DELETE_USER_ACCOUNT = 'DELETE_USER_ACCOUNT'

export function useDeleteAccount(
  mutationOptions: UseMutationOptions<DeleteUserAccountResponseBody, unknown, DeleteUserAccountRequestBody> = {}
): UseMutationResult<DeleteUserAccountResponseBody, unknown, DeleteUserAccountRequestBody> {
  return useMutation(
    [DELETE_USER_ACCOUNT],
    async (requestBody: DeleteUserAccountRequestBody) => {
      const { data } = await apiService.post<DeleteUserAccountResponseBody>(ENDPOINTS_FULL_PATH.user.delete, requestBody)
      return data;
    },
    mutationOptions
  )
}
