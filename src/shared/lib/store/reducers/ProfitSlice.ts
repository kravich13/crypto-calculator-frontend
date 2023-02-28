import { ICalculateProfitResponse } from '@cc/shared/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ProfitSlice = ICalculateProfitResponse;

const initialState: ProfitSlice = {
  investmentPeriod: 0,
  totalCapital: 0,
  totalGrowth: 0,
  totalInvested: 0,
  coins: [],
};

export const profitSlice = createSlice({
  name: 'profit',
  initialState,
  reducers: {
    clearState() {
      return { ...initialState };
    },
    setBaseProfit(state, { payload }: PayloadAction<ICalculateProfitResponse>) {
      state.coins = payload.coins;
      state.investmentPeriod = payload.investmentPeriod;
      state.totalCapital = payload.totalCapital;
      state.totalGrowth = payload.totalGrowth;
      state.coins = payload.coins;
    },
  },
});

export const profitReducer = profitSlice.reducer;
