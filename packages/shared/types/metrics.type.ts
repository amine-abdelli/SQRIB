export interface GetGlobalMetricsResponse {
  game_count: number;
  account_count: number;
  best_wpm: number;
  average_wpm: number;
  best_accuracy: number;
  average_accuracy: number;
  best_points: number;
  average_points: number;
  total_points: number;
  total_time_in_seconds: number;
}

export type GetGlobalMetricsResponseBody = GetGlobalMetricsResponse;
