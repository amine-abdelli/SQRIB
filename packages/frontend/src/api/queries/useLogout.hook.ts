import { UseMutationOptions, UseMutationResult, useMutation } from "react-query";
import { apiService } from "../api";
import { ENDPOINTS, ROUTES } from "@sqrib/shared";

export const LOGOUT_USER = 'LOGOUT_USER';

export function useLogout(
  mutationOptions: UseMutationOptions<void, unknown, void, unknown> = {}
): UseMutationResult<void, unknown, void, unknown> {
  return useMutation(
    [LOGOUT_USER],
    async () => { await apiService.post(ROUTES.auth + ENDPOINTS.auth.logout); },
    { onSuccess: () => { window.location.reload(); }, ...mutationOptions }
  );
}
