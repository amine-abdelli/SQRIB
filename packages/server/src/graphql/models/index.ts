import { Types } from './Types/Types';
import { ScoreTypes } from './Types/Score';
import { Query } from './Query';
import { Mutation } from './Mutation';

export const typeDefs = [
  Mutation,
  Query,
  ...Types,
  ...ScoreTypes,
];
