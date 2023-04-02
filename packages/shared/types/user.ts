export interface IRegister {
  email: string;
  username: string;
  password: string;
}

interface IUserCredentialBase {
  password: string;
}

interface IUserCredentialWithEmail extends IUserCredentialBase {
  username?: string;
  email: string;
}

interface IUserCredentialWithUsername extends IUserCredentialBase {
  username: string;
  email?: string;
}

export type IUserCredential = IUserCredentialWithEmail | IUserCredentialWithUsername;
