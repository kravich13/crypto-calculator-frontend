import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import {
  ICoinSearchRequest,
  CalculateProfitRequest,
  ICalculateProfitResponse,
  CoinSearchResponse,
  IPeriodAndAmountRequest,
  IPeriodAndAmountResponse,
} from '../types';

export const calculatorAPI = createApi({
  reducerPath: 'calculatorAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: '/crypto',
    prepareHeaders(headers, { getState }) {
      const token = (getState() as any)?.authReducer?.accessToken;

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
        return headers;
      }
    },
  }),

  endpoints: (build) => ({
    periodAndAmount: build.mutation<IPeriodAndAmountResponse, IPeriodAndAmountRequest>({
      query: (data) => ({
        url: '/coin-list',
        method: 'POST',
        body: data,
      }),
    }),
    coinSearch: build.query<CoinSearchResponse, ICoinSearchRequest>({
      query: (data) => ({
        url: '/coin-search',
        method: 'POST',
        body: data,
      }),
    }),
    calculateProfit: build.mutation<ICalculateProfitResponse, CalculateProfitRequest>({
      query: (data) => ({
        url: '/calculate-profit',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { usePeriodAndAmountMutation, useLazyCoinSearchQuery, useCalculateProfitMutation } =
  calculatorAPI;
