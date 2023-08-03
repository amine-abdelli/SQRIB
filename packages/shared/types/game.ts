import { TLanguage } from './language';

export interface TrainingGamesRequestBody {
  count: number;
  language: TLanguage;
}

export interface TrainingGamesResponseBody {
  data: string[]
}
