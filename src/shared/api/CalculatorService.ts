import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import {
  CalculateProfitRequest,
  CoinSearchResponse,
  ICalculateProfitResponse,
  ICoinSearchRequest,
  IPeriodAndAmountRequest,
  IPeriodAndAmountResponse,
  RootState,
} from '../types';

export const calculatorAPI = createApi({
  reducerPath: 'calculatorAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.CRYPTO_API_URL}/crypto`,
    prepareHeaders(headers, { getState }) {
      const token = (getState() as RootState).authReducer.accessToken;

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
        return headers;
      }
    },
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },

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
