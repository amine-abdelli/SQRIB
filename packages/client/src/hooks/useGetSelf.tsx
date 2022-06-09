import { QueryHookOptions, useQuery } from '@apollo/client';
import { SELF_QUERY } from '@aqac/api';

export function useGetSelf(options: QueryHookOptions = {}) {
  const { data, ...rest } = useQuery(SELF_QUERY, {
    onError: (error) => { console.error('error', error); },
    errorPolicy: 'ignore',
    ...options,
  });
  const scores = data?.self?.scores;
  const settings = data?.self?.settings;
  const isLoggedIn = Boolean(data?.self.email);
  return {
    data, scores, settings, isLoggedIn, ...rest,
  };
}
