export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresIn: number;
  refreshTokenExpiresIn: number;
}

export interface ILoginRequest {
  email: string;
  password: string;
}
