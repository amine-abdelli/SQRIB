export enum Difficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

export enum WordsCollectionLayout {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal',
}

export enum TrainingMode {
  SPEED_CHALLENGE = 'SPEED_CHALLENGE',
  TIME_TRIAL = 'TIME_TRIAL',
}

export enum WordsType {
  RANDOM = 'random',
  QUOTE = 'quote',
  CUSTOM = 'custom',
}

export type TWordsType = 'random' | 'quote' | 'custom';

export type TWordsCollectionLayout = WordsCollectionLayout;

export type TDifficulty = Difficulty;

export type TTrainingMode = TrainingMode.SPEED_CHALLENGE | TrainingMode.TIME_TRIAL;
