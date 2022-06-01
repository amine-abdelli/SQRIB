import { Types } from './Types/Types';
import { GameTypes } from './Types/Game';
import { ScoreTypes } from './Types/Score';
import { Query } from './Query';
import { Mutation } from './Mutation';
import { Settings } from './Types';

export const typeDefs = [
  Mutation,
  Query,
  Settings,
  ...Types,
  ...ScoreTypes,
  ...GameTypes,
];
