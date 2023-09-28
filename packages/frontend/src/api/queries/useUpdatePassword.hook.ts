import { ENDPOINTS_FULL_PATH, UpdateUserPasswordRequestBody, UpdateUserResponseBody } from "@sqrib/shared";
import { UseMutationOptions, useMutation } from "react-query";
import { apiService } from "../api";

const UPDATE_PASSWORD = 'UPDATE_PASSWORD';

export function useUpdatePassword(
  mutationOptions: UseMutationOptions<UpdateUserResponseBody, unknown, UpdateUserPasswordRequestBody> = {}
) {
  return useMutation(
    [UPDATE_PASSWORD],
    async (requestBody: UpdateUserPasswordRequestBody) => {
      const response = await apiService.post<UpdateUserResponseBody>(ENDPOINTS_FULL_PATH.user.update_password, requestBody);
      return response.data;
    },
    mutationOptions
  );
}
