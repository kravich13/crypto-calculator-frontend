import { ICalculatorSlice, IProfitSlice } from '@cc/shared/types';

export const filledCalculatorState: ICalculatorSlice = {
  maxNumberOfCoinsToInvest: 3,
  monthlyInvestment: '100',
  startDate: 1400014800000,
  endDate: 1684055275734,
};

export const filledProfitState: IProfitSlice = {
  hasData: true,
  totalInvested: 3900,
  investmentPeriod: 13,
  totalCapital: 3120,
  totalGrowth: -20,
  monthlyCapitals: [
    {
      date: 1573596000000,
      capital: 300,
    },
    {
      date: 1576706400000,
      capital: 483.43,
    },
    {
      date: 1579384800000,
      capital: 894.02,
    },
    {
      date: 1582063200000,
      capital: 1485.4,
    },
    {
      date: 1584568800000,
      capital: 1064.31,
    },
    {
      date: 1587247200000,
      capital: 1809.33,
    },
    {
      date: 1589839200000,
      capital: 2487.42,
    },
    {
      date: 1592517600000,
      capital: 2405.11,
    },
    {
      date: 1595109600000,
      capital: 2674.31,
    },
    {
      date: 1597788000000,
      capital: 4190.46,
    },
    {
      date: 1600466400000,
      capital: 3209.2,
    },
    {
      date: 1603058400000,
      capital: 3271.15,
    },
    {
      date: 1605218400000,
      capital: 3120.17,
    },
  ],
  coins: [
    {
      coinId: 'nxt',
      image: 'https://assets.coingecko.com/coins/images/6/large/nxt.png?1547033614',
      symbol: 'nxt',
      name: 'NXT',
      startingPrice: 0.01304,
      averagePrice: 0.01102,
      lastPrice: 0.008981,
      invested: 780,
      capital: 661,
      purchasedCoins: 73614.7,
      growth: -15,
      share: 20,
    },
    {
      coinId: 'fedoracoin',
      image: 'https://assets.coingecko.com/coins/images/35/large/fedoracoin.png?1547483540',
      symbol: 'tips',
      name: 'Fedoracoin',
      startingPrice: 0.000001646,
      averagePrice: 0.000001238,
      lastPrice: 0,
      invested: 3120,
      capital: 2459,
      purchasedCoins: 2637619324,
      growth: -21,
      share: 80,
    },
  ],
};
