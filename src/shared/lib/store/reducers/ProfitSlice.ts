import { ICalculateProfitResponse } from '@cc/shared/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ProfitSlice = ICalculateProfitResponse & { hasData?: boolean };

const initialState: ProfitSlice = {
  // hasData: false,
  // totalInvested: 0,
  // investmentPeriod: 0,
  // totalCapital: 0,
  // totalGrowth: 0,
  // coins: [],
  // monthlyCapitals: [],

  hasData: true,
  totalInvested: 1300,
  investmentPeriod: 13,
  totalCapital: 4499.94,
  totalGrowth: 246.15,
  monthlyCapitals: [
    { date: 1602277200000, capital: 100 },
    { date: 1605733200000, capital: 223.74 },
    { date: 1608325200000, capital: 416.96 },
    { date: 1611003600000, capital: 727.76 },
    { date: 1613682000000, capital: 1631.14 },
    { date: 1616101200000, capital: 2310.24 },
    { date: 1618779600000, capital: 3517.89 },
    { date: 1621371600000, capital: 4060.8 },
    { date: 1624050000000, capital: 2953.63 },
    { date: 1626642000000, capital: 2477.32 },
    { date: 1629320400000, capital: 3874.35 },
    { date: 1631998800000, capital: 4359.5 },
    { date: 1633813200000, capital: 4499.94 },
  ],
  coins: [
    {
      coinId: 'cardano',
      image: 'https://assets.coingecko.com/coins/images/975/large/cardano.png?1547034860',
      symbol: 'ada',
      name: 'Cardano',
      startingPrice: 0.1019,
      averagePrice: 1.2,
      lastPrice: 2.23,
      invested: 260,
      capital: 1502.91,
      purchasedCoins: 673.7,
      growth: 478.04,
      share: 20,
    },
    {
      coinId: 'ethereum',
      image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880',
      symbol: 'eth',
      name: 'Ethereum',
      startingPrice: 365.34,
      averagePrice: 2022.1,
      lastPrice: 3558.55,
      invested: 260,
      capital: 772.15,
      purchasedCoins: 0.217,
      growth: 196.98,
      share: 20,
    },
    {
      coinId: 'binancecoin',
      image: 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png?1644979850',
      symbol: 'bnb',
      name: 'BNB',
      startingPrice: 28.39,
      averagePrice: 267.51,
      lastPrice: 418.32,
      invested: 260,
      capital: 1276.61,
      purchasedCoins: 3.052,
      growth: 391,
      share: 20,
    },
    {
      coinId: 'ripple',
      image:
        'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png?1605778731',
      symbol: 'xrp',
      name: 'XRP',
      startingPrice: 0.2532,
      averagePrice: 0.7775,
      lastPrice: 1.06,
      invested: 260,
      capital: 500.67,
      purchasedCoins: 471.7,
      growth: 92.57,
      share: 20,
    },
    {
      coinId: 'bitcoin',
      image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579',
      symbol: 'btc',
      name: 'Bitcoin',
      startingPrice: 11063.25,
      averagePrice: 39853.43,
      lastPrice: 54010.94,
      invested: 260,
      capital: 447.6,
      purchasedCoins: 0.00829,
      growth: 72.15,
      share: 20,
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
      state.monthlyCapitals = payload.monthlyCapitals;

      state.hasData = true;
    },
  },
});

export const { reducer: profitReducer, actions: profitActions } = profitSlice;
