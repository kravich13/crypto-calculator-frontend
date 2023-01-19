import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ICalculatorSlice {
  investmentCards: any[];
  addedCoinsId: string[];
  profitPercentage: string;
  mounthlyInvestment: number;
  startDate?: string;
  endDate?: string;
}

const initialState: ICalculatorSlice = {
  investmentCards: [],
  addedCoinsId: [],
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
    addCoinToInvestment(state, { payload }: PayloadAction<string>) {
      state.addedCoinsId.push(payload);
    },
  },
});

export const calculatorReducer = calculatorSlice.reducer;
