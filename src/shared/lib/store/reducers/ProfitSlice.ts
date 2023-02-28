import { ICalculateProfitResponse } from '@cc/shared/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ProfitSlice = ICalculateProfitResponse;

const initialState: ProfitSlice = {
  totalInvested: 200,
  investmentPeriod: 2,
  totalCapital: 4625.59,
  totalGrowth: 2212.8,
  coins: [
    {
      coinId: 'bitcoin',
      image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579',
      name: 'Bitcoin',
      symbol: 'btc',
      share: 50,
      invested: 2400,
      capital: 2322.48,
      lastPrice: 23225.092570474746,
      purchasedCoins: 0.09999884191188763,
      growth: -3.23,
    },
    {
      coinId: 'litecoin',
      image: 'https://assets.coingecko.com/coins/images/2/large/litecoin.png?1547033580',
      name: 'Litecoin',
      symbol: 'ltc',
      share: 50,
      invested: 2400,
      capital: 2303.11,
      lastPrice: 93.27157237393688,
      purchasedCoins: 24.692546915152818,
      growth: -4.04,
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
      state.coins = payload.coins;
      state.investmentPeriod = payload.investmentPeriod;
      state.totalCapital = payload.totalCapital;
      state.totalGrowth = payload.totalGrowth;
      state.coins = payload.coins;
    },
  },
});

export const profitReducer = profitSlice.reducer;
