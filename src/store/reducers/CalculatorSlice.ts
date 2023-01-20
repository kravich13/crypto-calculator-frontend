import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAddedCoins, IMockData } from '../../components/calculateYield';

interface IRemoveCoin {
  id: string;
}

interface ICalculatorSlice {
  investmentCards: any[];
  addedCoins: IAddedCoins[];
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
      state.addedCoins.push({ ...payload, percent: 0 });
    },
    removeCoinFromInvestment(state, { payload }: PayloadAction<IRemoveCoin>) {
      return {
        ...state,
        addedCoins: state.addedCoins.filter(({ id }) => id !== payload.id),
      };
    },
  },
});

export const calculatorReducer = calculatorSlice.reducer;
