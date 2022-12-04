import { createSlice } from '@reduxjs/toolkit';

interface ICalculatorSlice {
  investmentCards: any[];
  profitPercentage: string;
  monthlyAmount: number;
  startDate?: string;
  endDate?: string;
}

const initialState: ICalculatorSlice = {
  investmentCards: [],
  profitPercentage: '',
  monthlyAmount: 0,
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
