import { UseMutationResult, useMutation } from "react-query";
import { apiService } from "../api";
import { ENDPOINTS_FULL_PATH } from "@sqrib/shared";
import { AxiosResponse } from "axios";

export const CHECK_USERNAME_AVAILABILITY = 'CHECK_USERNAME_AVAILABILITY';

interface UsernameCheckerRequestBody {
  username: string;
}

interface UsernameCheckerResponsePayload {
  isAvailable: boolean;
}

interface UsernameCheckerResponseBody {
  data: UsernameCheckerResponsePayload;
}

export function useUsernameChecker<T>(): UseMutationResult<AxiosResponse<any, any>, unknown, UsernameCheckerRequestBody> {
  return useMutation(
    [CHECK_USERNAME_AVAILABILITY],
    (requestBody: UsernameCheckerRequestBody) => apiService.get<T>(ENDPOINTS_FULL_PATH.user.username_availability, requestBody)
  );
}
