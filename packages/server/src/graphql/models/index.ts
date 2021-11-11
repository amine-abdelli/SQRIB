import { Types } from './Types/Types';
import { Query } from './Query';
import { Mutation } from './Mutation';

export const typeDefs = [
    Mutation,
    Query,
    ...Types,
];
