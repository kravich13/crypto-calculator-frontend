export interface IMainCoinInfo {
  name: string;
  coinId: string;
  image: string;
  symbol: string;
}

export interface ICoinProfitData {
  share: number;
  lastPrice: number;
  invested: number;
  capital: number;
  growth: number;
  purchasedCoins: number;
}
