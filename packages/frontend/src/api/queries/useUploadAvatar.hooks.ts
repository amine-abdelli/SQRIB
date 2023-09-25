import { UseMutationResult, useMutation } from 'react-query';

import { apiService } from '../api';
import { ENDPOINTS_FULL_PATH } from '@sqrib/shared';

const UPLOAD_AVATAR = 'UPLOAD_AVATAR';

type response = any;
type request = any;

export function useUploadAvatar(): UseMutationResult<response, unknown, request> {
  return useMutation([UPLOAD_AVATAR], (avatarFile) => apiService.post<response>(`${ENDPOINTS_FULL_PATH.user.upload_avatar}`, avatarFile));
}