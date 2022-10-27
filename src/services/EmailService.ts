import { createApi, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/dist/query/react';
import { IEmailCodeRequest, IEmailCodeResponse } from '../models';

export const emailAPI = createApi({
  reducerPath: 'authAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'email' }),
  endpoints: (build) => ({
    codeEmail: build.mutation<IEmailCodeResponse, IEmailCodeRequest>({
      query: (data) => ({
        url: '/code',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useCodeEmailMutation } = emailAPI;
