import { IPeriodAndAmountForm } from '@cc/shared/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IBaseCalculatorSlice extends IPeriodAndAmountForm {
  maxNumberOfCoinsToInvest: number;
}

const initialState: IBaseCalculatorSlice = {
  maxNumberOfCoinsToInvest: 1,
  monthlyInvestment: '',
  startDate: '',
  endDate: '',
};

export const baseCalculatorSlice = createSlice({
  name: 'calculator',
  initialState,
  reducers: {
    clearState() {
      return { ...initialState };
    },
    setPeriodAndAmount(state, { payload }: PayloadAction<IPeriodAndAmountForm>) {
      state.startDate = payload.startDate;
      state.endDate = payload.endDate;
      state.monthlyInvestment = payload.monthlyInvestment;
    },
    setMaxNumberOfCoinsToInvest(state, { payload }: PayloadAction<number>) {
      state.maxNumberOfCoinsToInvest = payload;
    },
  },
});

export const baseCalculatorReducer = baseCalculatorSlice.reducer;
