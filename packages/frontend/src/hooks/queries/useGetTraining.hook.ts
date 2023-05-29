import { useQuery, UseQueryResult } from 'react-query';
import { TrainingGamesRequestBody, TrainingGamesResponseBody } from '@sqrib/shared';
import { apiService } from '../../api/api';
import { endpoints } from '../../api';

export const GET_TRAINING_WORD_CHAIN = 'GET_TRAINING_WORD_CHAIN';

export function useGetTrainingWordChain<T>(
  requestBody: TrainingGamesRequestBody,
): UseQueryResult<TrainingGamesResponseBody> {
  return useQuery(
    [GET_TRAINING_WORD_CHAIN, requestBody],
    () => apiService.get<T>(endpoints.getTrainingWordChain, requestBody),
    // Fetch data only when we trigger refetch method
    { enabled: false }
  );
}
