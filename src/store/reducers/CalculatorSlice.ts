import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMockData } from '../../components/calculateYield';

interface ICalculatorSlice {
  investmentCards: any[];
  addedCoins: IMockData[];
  profitPercentage: string;
  mounthlyInvestment: number;
  startDate?: string;
  endDate?: string;
}

const initialState: ICalculatorSlice = {
  investmentCards: [],
  addedCoins: [],
  profitPercentage: '',
  mounthlyInvestment: 0,
  startDate: undefined,
  endDate: undefined,
};

export const calculatorSlice = createSlice({
  name: 'calculator',
  initialState,
  reducers: {
    clearState() {
      return { ...initialState };
    },
    addCoinToInvestment(state, { payload }: PayloadAction<IMockData>) {
      state.addedCoins.push(payload);
    },
    removeCoinToInvestment(state, { payload }: PayloadAction<string>) {
      state.addedCoins.filter(({ id }) => id !== payload);
    },
  },
});

export const calculatorReducer = calculatorSlice.reducer;
