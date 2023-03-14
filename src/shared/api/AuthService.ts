import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import {
  IEmailCodeRequest,
  IEmailValidateRequest,
  IHeadersRequest,
  ILoginRequest,
  ILoginResponse,
  INewPasswordRequest,
  IPasswordForgotRequest,
  ISuccessResponseStatus,
} from '../types';

export const authAPI = createApi({
  reducerPath: 'authAPI',
  baseQuery: fetchBaseQuery({ baseUrl: '/auth' }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (build) => ({
    signUp: build.mutation<ILoginResponse, ILoginRequest>({
      query: (data) => ({
        url: '/sign-up',
        method: 'POST',
        body: data,
      }),
    }),

    emailValidate: build.mutation<ISuccessResponseStatus, IEmailValidateRequest & IHeadersRequest>({
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

    codeEmail: build.mutation<ISuccessResponseStatus, IEmailCodeRequest>({
      query: (data) => ({
        url: '/email/code',
        method: 'POST',
        body: data,
      }),
    }),

    forgotPassword: build.mutation<ISuccessResponseStatus, IPasswordForgotRequest>({
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
