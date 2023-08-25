import { UseMutationOptions, UseMutationResult, useMutation } from 'react-query';
import { apiService } from '../api';
import { ENDPOINTS, ROUTES, SaveTrainingScoringRequestBody, SaveTrainingScoringResponseBody } from '@sqrib/shared';

export const SAVE_TRAINING_SCORE = 'SAVE_TRAINING_SCORE';

export function useSaveTrainingScore(
  mutationOptions: UseMutationOptions<SaveTrainingScoringResponseBody, unknown, SaveTrainingScoringRequestBody> = {}
): UseMutationResult<SaveTrainingScoringResponseBody, unknown, SaveTrainingScoringRequestBody> {
  return useMutation(
    [SAVE_TRAINING_SCORE],
    async (requestBody: SaveTrainingScoringRequestBody) => {
      const response = await apiService.post<SaveTrainingScoringResponseBody>(ROUTES.game + ENDPOINTS.game.save_scoring, requestBody);
      return response.data;
    },
    mutationOptions,
  );
}
