import { UseQueryResult, useQuery } from "react-query";
import { apiService } from "../api";
import { ENDPOINTS_FULL_PATH, GetUserStatsResponseBody } from "@sqrib/shared";

const GET_USER_STATS = 'GET_USER_STATS';

export function useGetUserStats<T>(): UseQueryResult<GetUserStatsResponseBody> {
  return useQuery(
    [GET_USER_STATS],
    () => apiService.get<T>(ENDPOINTS_FULL_PATH.user.user_stats)
  );
}
