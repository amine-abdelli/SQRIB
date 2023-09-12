import { UseQueryResult, useQuery } from "react-query";
import { apiService } from "../api";
import { ENDPOINTS_FULL_PATH } from "@sqrib/shared";

export const GET_USER_WEEKLY_TRACKER = 'GET_USER_WEEKLY_TRACKER';

export function useGetUserWeeklyTracker<T>(): UseQueryResult<any> {
  return useQuery(
    [GET_USER_WEEKLY_TRACKER],
    () => apiService.get<T>(ENDPOINTS_FULL_PATH.user.weekly_tracker),
  );
}
