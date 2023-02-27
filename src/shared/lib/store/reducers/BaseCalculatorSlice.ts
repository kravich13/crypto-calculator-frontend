import { ISelectedCoinShare } from '@cc/shared/types';
import { IPeriodAndAmountRequest } from '@cc/shared/types/api/calculator.api';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IBaseCalculatorSlice extends IPeriodAndAmountRequest {
  selectedCoinsShare: ISelectedCoinShare[];
}

const initialState: IBaseCalculatorSlice = {
  monthlyInvestment: 0,
  startDate: 0,
  endDate: 0,
  selectedCoinsShare: [],
};

export const baseCalculatorSlice = createSlice({
  name: 'calculator',
  initialState,
  reducers: {
    clearState() {
      return { ...initialState };
    },
    setPeriodAndAmount(state, { payload }: PayloadAction<IPeriodAndAmountRequest>) {
      state.startDate = payload.startDate;
      state.endDate = payload.endDate;
      state.monthlyInvestment = payload.monthlyInvestment;
    },
  },
});

export const baseCalculatorReducer = baseCalculatorSlice.reducer;
