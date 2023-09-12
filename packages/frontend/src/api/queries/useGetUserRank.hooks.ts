import { ENDPOINTS_FULL_PATH, GetUserRankResponseBody } from "@sqrib/shared";
import { UseQueryResult, useQuery } from "react-query";
import { apiService } from "../api";

export const GET_USER_RANK = 'GET_USER_RANK';

export function useGetUserRank<T>(): UseQueryResult<GetUserRankResponseBody> {
  return useQuery([GET_USER_RANK], () => apiService.get<T>(ENDPOINTS_FULL_PATH.user.get_user_rank));
}
