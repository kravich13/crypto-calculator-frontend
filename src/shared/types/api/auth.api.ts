import { IJwtTokensPayload } from '../store';

export interface ILoginResponse {
  emailCodeResendExpiresIn: number;
}

export interface ILoginRequest {
  email: string;
}

export interface IEmailValidateResponse extends IJwtTokensPayload {}

export interface IEmailValidateRequest {
  email: string;
  code: string;
}

export interface IRefreshTokensResponse extends IJwtTokensPayload {}

export interface IRefreshTokensRequest {
  refreshToken: string;
}
