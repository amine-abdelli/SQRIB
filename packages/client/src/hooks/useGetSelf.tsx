import { QueryHookOptions, useQuery } from '@apollo/client';
import { SELF_QUERY } from '@aqac/api';

export function useGetSelf(options: QueryHookOptions = {}) {
  const { data, ...rest } = useQuery(SELF_QUERY, {
    onError: (error) => { console.log('error'); },
    errorPolicy: 'ignore', // we don't want the app to crash because of that trivial query
    // instead it will just redirect to login
    ...options,
  });
  const scores = data?.self?.scores;
  const isLoggedIn = Boolean(data?.self.email);
  return {
    data, scores, isLoggedIn, ...rest,
  };
}
