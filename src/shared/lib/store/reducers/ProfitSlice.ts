import { ICalculateProfitResponse } from '@cc/shared/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ProfitSlice = ICalculateProfitResponse & { hasData?: boolean };

const initialState: ProfitSlice = {
  hasData: true,
  // totalInvested: 0,
  // investmentPeriod: 0,
  // totalCapital: 0,
  // totalGrowth: 0,
  // coins: [],
  totalInvested: 6500,
  investmentPeriod: 26,
  totalCapital: 4986.24,
  totalGrowth: -23.29,
  coins: [
    {
      coinId: 'bitcoin',
      image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579',
      name: 'Bitcoin',
      symbol: 'btc',
      share: 50,
      invested: 3125,
      capital: 2394.78,
      startingPrice: 44970.16,
      lastPrice: 23518.12,
      purchasedCoins: 0.10183,
      growth: -23.37,
    },
    {
      coinId: 'ethereum',
      image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880',
      name: 'Ethereum',
      symbol: 'eth',
      share: 50,
      invested: 3125,
      capital: 2591.46,
      startingPrice: 1416.66,
      lastPrice: 1633.98,
      purchasedCoins: 1.586,
      growth: -17.07,
    },
  ],
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
      state.hasData = true;
    },
  },
});

export const profitReducer = profitSlice.reducer;
