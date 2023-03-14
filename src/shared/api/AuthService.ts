import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import {
  IEmailValidateRequest,
  IEmailValidateResponse,
  ILoginRequest,
  ILoginResponse,
  IRefreshTokensRequest,
  IRefreshTokensResponse,
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
    signIn: build.mutation<ILoginResponse, ILoginRequest>({
      query: (data) => ({
        url: '/sign-in',
        method: 'POST',
        body: data,
      }),
    }),

    emailValidate: build.mutation<IEmailValidateResponse, IEmailValidateRequest>({
      query: (data) => ({
        url: '/email/validate',
        method: 'POST',
        body: data,
      }),
    }),

    refreshTokens: build.mutation<IRefreshTokensResponse, IRefreshTokensRequest>({
      query: (data) => ({
        url: '/refresh-tokens',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useSignInMutation, useEmailValidateMutation, useRefreshTokensMutation } = authAPI;
