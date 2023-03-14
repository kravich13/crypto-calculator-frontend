export interface IJwtTokensPayload {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresIn: number;
  refreshTokenExpiresIn: number;
}

export interface IAuthInitialState extends IJwtTokensPayload {
  isAuth?: boolean;
}
