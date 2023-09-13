import React from 'react';
import Cookies from 'js-cookie';
import { UseQueryResult, useQuery } from 'react-query';
import { apiService } from '../api';
import { ENDPOINTS_FULL_PATH, GetSelfResponseBody } from '@sqrib/shared';

const GET_SELF = 'GET_SELF';

interface mutationOptions {
  username?: string;
  onSuccess?: () => void;
  onError?: () => void;
  refetch?: () => void;
}

export function useGetSelf(mutationOptions: mutationOptions = {}) {
  const session_id = Cookies.get('session_id');
  const username = mutationOptions.username;
  const { data: userData, isLoading, refetch }: UseQueryResult<GetSelfResponseBody, unknown> = useQuery(
    [GET_SELF, session_id],
    () => apiService.get(`${ENDPOINTS_FULL_PATH.user.me}${username ? `?username=${username}` : ''}`),
    {
      onSuccess: mutationOptions.onSuccess,
      onError: mutationOptions.onError
    }
  );

  const isAuthenticated = Boolean(userData?.data.id);
  return {
    isAuthenticated,
    user: userData?.data,
    loading: isLoading,
    refetch
  };
}
