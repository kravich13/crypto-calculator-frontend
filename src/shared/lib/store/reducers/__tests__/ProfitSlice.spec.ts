import { profitActions, profitReducer } from '../ProfitSlice';

describe('profitSlice', () => {
  const initialState = {
    hasData: false,
    totalInvested: 0,
    investmentPeriod: 0,
    totalCapital: 0,
    totalGrowth: 0,
    coins: [],
    monthlyCapitals: [],
  };

  const readyState = {
    hasData: true,
    totalInvested: 300,
    investmentPeriod: 2,
    totalCapital: 600,
    totalGrowth: 100,
    coins: [
      {
        averagePrice: 100,
        capital: 600,
        coinId: 'bitcoin',
        growth: 100,
        image: 'test.url',
        invested: 300,
        lastPrice: 20000,
        name: 'bitcoin',
        purchasedCoins: 1,
        share: 100,
        startingPrice: 10000,
        symbol: 'btc',
      },
    ],
    monthlyCapitals: [
      { capital: 300, date: 12312312312312 },
      { capital: 600, date: 12312312312312 },
    ],
  };

  it('should return the initial state', () => {
    expect(profitReducer(undefined, { type: 'init' })).toEqual(initialState);
  });

  it('should handle clearState', () => {
    expect(profitReducer(readyState, profitActions.clearState())).toEqual(initialState);
  });

  it('should handle setBaseProfit', () => {
    const { hasData, ...nextState } = readyState;

    expect(profitReducer(initialState, profitActions.setBaseProfit(nextState))).toEqual(readyState);
  });
});
