import { Languages } from '../utils';

export interface TrainingGamesRequestBody {
  count: number;
  language: Languages;
}

export interface TrainingGamesResponseBody {
  data: string[]
}
