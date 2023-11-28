import { useApolloClient } from '@apollo/client';
import { DocumentNode } from 'graphql';

export function UseCacheUpdate(query: DocumentNode, key: string, value: unknown, ...rest: any) {
  const { cache } = useApolloClient();
  return cache.writeQuery({
    query,
    data: {
      self: {
        ...rest,
        [key]: value,
      },
    },
  });
}
