import { QueryHookOptions, useLazyQuery } from '@apollo/client';
import { SELF_QUERY } from '@aqac/api';
import { log } from '@aqac/utils';

export function useLazyGetSelf(options: QueryHookOptions = {}) {
  const [querySelf, { data, ...rest }] = useLazyQuery(SELF_QUERY, {
    onError: (error) => { log.error('error', error); },
    errorPolicy: 'ignore',
    ...options,
  });
  const scores = data?.self?.scores;
  const settings = data?.self?.settings;
  const isLoggedIn = Boolean(data?.self.email);
  return {
    querySelf, data, scores, settings, isLoggedIn, ...rest,
  };
}
