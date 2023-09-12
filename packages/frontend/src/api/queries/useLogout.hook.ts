import { UseMutationOptions, UseMutationResult, useMutation } from "react-query";
import { apiService } from "../api";
import { ENDPOINTS_FULL_PATH } from "@sqrib/shared";

export const LOGOUT_USER = 'LOGOUT_USER';

export function useLogout(
  mutationOptions: UseMutationOptions<void, unknown, void, unknown> = {}
): UseMutationResult<void, unknown, void, unknown> {
  return useMutation(
    [LOGOUT_USER],
    async () => { await apiService.post(ENDPOINTS_FULL_PATH.auth.logout); },
    { onSuccess: () => { window.location.reload(); }, ...mutationOptions }
  );
}
