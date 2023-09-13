import { UseQueryResult, useQuery } from "react-query";
import { apiService } from "../api";
import { ENDPOINTS_FULL_PATH } from "@sqrib/shared";

export const GET_USER_SCORES = 'GET_USER_SCORES';

interface GetUserScoresParams {
  username?: string;
}

export function useGetUserScores<T>({ username }: GetUserScoresParams): UseQueryResult<any> {
  return useQuery([GET_USER_SCORES], () => apiService.get<T>(`${ENDPOINTS_FULL_PATH.user.get_user_scores}${username ? `?username=${username}` : ''}`));
}
