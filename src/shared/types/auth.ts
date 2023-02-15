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

export interface IEmailCodeResponse {
  status: string;
}

export interface IEmailCodeRequest extends IEmailValidateRequest {
  email: string;
}

export interface IEmailValidateRequest {
  code: string;
}

export interface IPasswordForgotRequest {
  email: string;
}

export interface INewPasswordRequest extends IEmailCodeRequest {
  password: string;
}

export interface IHeadersRequest {
  authorization: string;
}
