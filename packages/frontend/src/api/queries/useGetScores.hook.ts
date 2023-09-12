import { UseQueryResult, useQuery } from "react-query";
import { apiService } from "../api";
import { ENDPOINTS_FULL_PATH } from "@sqrib/shared";

export const GET_USER_SCORES = 'GET_USER_SCORES';

export function useGetUserScores<T>(): UseQueryResult<any> {
  return useQuery([GET_USER_SCORES], () => apiService.get<T>(ENDPOINTS_FULL_PATH.user.get_user_scores));
}
