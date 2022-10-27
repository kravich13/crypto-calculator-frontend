import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { ILoginRequest, ILoginResponse } from '../models';

export const authAPI = createApi({
  reducerPath: 'authAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'auth' }),
  endpoints: (build) => ({
    signUp: build.mutation<ILoginResponse, ILoginRequest>({
      query: (data) => ({
        url: '/sign-up',
        method: 'POST',
        body: data,
      }),
    }),

    signIn: build.mutation<ILoginResponse, ILoginRequest>({
      query: (data) => ({
        url: '/sign-in',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation } = authAPI;
