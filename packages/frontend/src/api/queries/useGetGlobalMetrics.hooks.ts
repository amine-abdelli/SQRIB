import { UseQueryResult, useQuery } from "react-query";
import { ENDPOINTS_FULL_PATH, GetGlobalMetricsResponseBody } from "@sqrib/shared";
import { apiService } from "../api";

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