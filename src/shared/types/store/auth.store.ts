export interface ITokensData {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresIn: number;
  refreshTokenExpiresIn: number;
}

export interface IAuthInitialState extends ITokensData {
  isAuth?: boolean;
}
