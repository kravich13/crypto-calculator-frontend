import { createSlice } from '@reduxjs/toolkit';

interface ICalculatorSlice {
  investmentCards: any[];
  profitPercentage: string;
  mounthlyInvestment: number;
  startDate?: string;
  endDate?: string;
}

const initialState: ICalculatorSlice = {
  investmentCards: [],
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
  },
});

export const calculatorReducer = calculatorSlice.reducer;
