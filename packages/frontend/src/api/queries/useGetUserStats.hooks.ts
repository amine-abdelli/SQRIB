import { UseQueryResult, useQuery } from "react-query";
import { apiService } from "../api";
import { ENDPOINTS, ROUTES } from "@sqrib/shared";

const GET_USER_STATS = 'GET_USER_STATS';

export function useGetUserStats<T>(): UseQueryResult<any> {
  return useQuery(
    [GET_USER_STATS],
    () => apiService.get<T>(ROUTES.user + ENDPOINTS.user.user_stats)
  );
}
