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
}

export type UserCredential = UserCredentialWithEmail | IUserCredentialWithUsername;

export type CreateUserRequestBody = Register

export type CreateUserResponseBody = UserBase;

export type LoginUserResponseBody = UserBase;
export interface GetSelfResponseBody {
  data: UserBase
}
