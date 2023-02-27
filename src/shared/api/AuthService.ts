import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import {
  ILoginResponse,
  ILoginRequest,
  IEmailCodeResponse,
  IEmailValidateRequest,
  IHeadersRequest,
  IEmailCodeRequest,
  IPasswordForgotRequest,
  INewPasswordRequest,
} from '../types/api/auth.api';

export const authAPI = createApi({
  reducerPath: 'authAPI',
  baseQuery: fetchBaseQuery({ baseUrl: '/auth' }),
  endpoints: (build) => ({
    signUp: build.mutation<ILoginResponse, ILoginRequest>({
      query: (data) => ({
        url: '/sign-up',
        method: 'POST',
        body: data,
      }),
    }),

    emailValidate: build.mutation<IEmailCodeResponse, IEmailValidateRequest & IHeadersRequest>({
      query: ({ code, authorization }) => ({
        url: '/email/validate',
        method: 'POST',
        headers: { authorization },
        body: { code },
      }),
    }),

    signIn: build.mutation<ILoginResponse, ILoginRequest>({
      query: (data) => ({
        url: '/sign-in',
        method: 'POST',
        body: data,
      }),
    }),

    codeEmail: build.mutation<IEmailCodeResponse, IEmailCodeRequest>({
      query: (data) => ({
        url: '/email/code',
        method: 'POST',
        body: data,
      }),
    }),

    forgotPassword: build.mutation<IEmailCodeResponse, IPasswordForgotRequest>({
      query: (data) => ({
        url: '/email/forgot',
        method: 'POST',
        body: data,
      }),
    }),

    newPassword: build.mutation<ILoginResponse, INewPasswordRequest>({
      query: (data) => ({
        url: '/email/new-password',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useSignInMutation,
  useSignUpMutation,
  useCodeEmailMutation,
  useForgotPasswordMutation,
  useNewPasswordMutation,
  useEmailValidateMutation,
} = authAPI;
