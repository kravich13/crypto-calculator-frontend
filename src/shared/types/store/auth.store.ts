export interface IJwtTokensPayload {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresIn: number;
  refreshTokenExpiresIn: number;
}

export type LocalStorageUserData = ISetEmailInput;

export interface ISetEmailInput {
  email: string;
}

export interface ISetEmailCodeExpiresIn {
  emailCodeExpiresIn: number;
}

export interface IAuthInitialState extends IJwtTokensPayload {
  isAuth?: boolean;
  email: string;
  emailCodeExpiresIn: number;
}
