import { ICalculatorSlice, IPeriodAndAmountForm } from '@cc/shared/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as process from 'process';
import { filledCalculatorState } from '@cc/shared/consts';

const defaultState: ICalculatorSlice = {
  maxNumberOfCoinsToInvest: 1,
  monthlyInvestment: '',
  startDate: 0,
  endDate: 0,
};

const initialState: ICalculatorSlice = process.env.FILLED_SLICES
  ? filledCalculatorState
  : defaultState;

export const calculatorSlice = createSlice({
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

export const { reducer: calculatorReducer, actions: calculatorActions } = calculatorSlice;
