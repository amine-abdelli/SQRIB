import React from 'react';
import Cookies from 'js-cookie';
import { UseQueryResult, useQuery } from 'react-query';
import { apiService } from '../api';
import { ENDPOINTS_FULL_PATH, GetSelfResponseBody } from '@sqrib/shared';

const GET_SELF = 'GET_SELF';

interface mutationOptions {
  onSuccess?: () => void;
  onError?: () => void;
}

export function useGetSelf(mutationOptions: mutationOptions = {}) {
  const session_id = Cookies.get('session_id');

  const { data: userData, isLoading }: UseQueryResult<GetSelfResponseBody, unknown> = useQuery(
    [GET_SELF, session_id],
    () => apiService.get(ENDPOINTS_FULL_PATH.user.me),
    {
      onSuccess: mutationOptions.onSuccess,
      onError: mutationOptions.onError
    }
  );

  const isAuthenticated = Boolean(userData?.data.id);
  return {
    isAuthenticated,
    user: userData?.data,
    loading: isLoading
  };
}
