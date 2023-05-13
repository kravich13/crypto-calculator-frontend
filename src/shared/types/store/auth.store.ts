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

export interface ISetEmailCodeResendExpiresIn {
  emailCodeResendExpiresIn: number;
}

export interface IAuthInitialState extends IJwtTokensPayload {
  isAuth?: boolean;
  email: string;
  emailCodeResendExpiresIn: number;
}
