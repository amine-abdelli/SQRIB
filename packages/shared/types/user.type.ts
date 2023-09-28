export interface Register {
  email: string;
  username: string;
  password: string;
}

interface UserCredentialBase {
  password: string;
}

interface UserCredentialWithEmail extends UserCredentialBase {
  username?: string;
  email: string;
}

interface IUserCredentialWithUsername extends UserCredentialBase {
  username: string;
  email?: string;
}

export type UserBase = {
  id: string
  username: string
  email: string
  password: string
  description: string | null
  avatar: string | null
  created_at: Date
  is_confirmed: boolean
  is_locked: boolean
  last_password_update: Date | null
  last_activity: Date
  color: string | undefined
}

export type UpdateUserRequestBody = {
  username?: string
  email?: string
  description?: string
  avatar?: string
  color?: string
}

export type UserCredential = UserCredentialWithEmail | IUserCredentialWithUsername;

export type CreateUserRequestBody = Register

export type CreateUserResponseBody = UserBase;

export type LoginUserResponseBody = UserBase;

export interface GetSelfResponseBody {
  data: UserBase
}

export interface UserStats {
  session_count: number;
  best_wpm: number;
  average_wpm: number;
  average_accuracy: number;
  best_points: number;
  total_points: number;
  total_xp: number;
  total_time_in_seconds: number;
  total_words_typed: number;
  last_activity: Date;
  days_of_activity: number;
}

export interface GetUserStatsResponseBody {
  data: UserStats
}

export interface UserRankRange {
  best_wpm: number;
  username: string;
  average_accuracy: number;
  avatar?: string;
  color: string;
  rank: number;
  current?: boolean;
}

export interface UserRank {
  user_rank: number;
  range: UserRankRange[];
  username: string;
  total_users: number;
  user_total_points: number;
  user_best_wpm: number;
  uer_average_accuracy: number;
}

export interface GetUserRankResponseBody {
  data: UserRank
}

export interface UpdateUserPasswordRequestBody {
  oldPassword: string,
  newPassword: string,
  newPasswordConfirm: string,
}

export type UpdateUserResponseBody = UserBase;

export interface DeleteUserAccountRequestBody {
  password: string
}

export interface DeleteUserAccountResponseBody {
  message: string
}
