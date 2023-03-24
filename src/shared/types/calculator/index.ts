export interface IMainCoinInfo {
  name: string;
  coinId: string;
  image: string;
  symbol: string;
}

export interface ICoinProfitData {
  share: number;
  startingPrice: number;
  averagePrice: number;
  lastPrice: number;
  invested: number;
  capital: number;
  growth: number;
  purchasedCoins: number;
}

export type CalculateCoinProfitData = ICoinProfitData & IMainCoinInfo;

export interface IMonthlyCapital {
  date: number;
  capital: number;
}
