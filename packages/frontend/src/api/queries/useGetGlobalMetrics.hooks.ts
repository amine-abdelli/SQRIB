import { UseMutationOptions, UseQueryOptions, UseQueryResult, useQuery } from "react-query";
import { apiService } from "../api";
import { ENDPOINTS_FULL_PATH, GetGlobalMetricsResponseBody } from "@sqrib/shared";

const GET_GLOBAL_METRICS = 'GET_GLOBAL_METRICS';

export function useGetGlobalMetrics(): UseQueryResult<GetGlobalMetricsResponseBody, unknown> {
  return useQuery(
    [GET_GLOBAL_METRICS],
    async (): Promise<GetGlobalMetricsResponseBody> => {
      const { data } = await apiService.get<GetGlobalMetricsResponseBody>(ENDPOINTS_FULL_PATH.metrics.get_global_metrics);
      return data;
    }
  )
}