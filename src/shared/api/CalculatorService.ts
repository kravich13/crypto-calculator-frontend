import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { ILoginResponse } from '../types/api/auth.api';
import { IPeriodAndAmountRequest } from '../types/api/calculator.api';

export const calculatorAPI = createApi({
  reducerPath: 'calculatorAPI',
  baseQuery: fetchBaseQuery({ baseUrl: '/crypto' }),
  endpoints: (build) => ({
    periodAndAmount: build.mutation<ILoginResponse, IPeriodAndAmountRequest>({
      query: (data) => ({
        url: '/coin-list',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { usePeriodAndAmountMutation } = calculatorAPI;
