import { ICalculateProfitResponse } from '@cc/shared/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ProfitSlice = ICalculateProfitResponse & { hasData?: boolean };

const initialState: ProfitSlice = {
  hasData: false,
  totalInvested: 0,
  investmentPeriod: 0,
  totalCapital: 0,
  totalGrowth: 0,
  coins: [],
  monthlyCapitals: [],
};

export const profitSlice = createSlice({
  name: 'profit',
  initialState,
  reducers: {
    clearState() {
      return { ...initialState };
    },
    setBaseProfit(state, { payload }: PayloadAction<ICalculateProfitResponse>) {
      state.totalInvested = payload.totalInvested;
      state.investmentPeriod = payload.investmentPeriod;
      state.totalCapital = payload.totalCapital;
      state.totalGrowth = payload.totalGrowth;
      state.coins = payload.coins;
      state.monthlyCapitals = payload.monthlyCapitals;

      state.hasData = true;
    },
  },
});

export const { reducer: profitReducer, actions: profitActions } = profitSlice;
