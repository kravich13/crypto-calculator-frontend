import { CalculateCoinProfitData, IMainCoinInfo, IMonthlyCapital } from '../calculator';

export interface IPeriodAndAmountRequest {
  monthlyInvestment: number;
  startDate: number;
  endDate: number;
}

export interface IPeriodAndAmountResponse {
  maxNumberOfCoinsToInvest: number;
}

export interface ICoinSearchRequest {
  searchText: string;
  limit: number;
}

export type CoinSearchResponse = IMainCoinInfo[];

export type CalculateProfitRequest = {
  coinId: string;
  share: number;
}[];

export interface ICalculateProfitResponse {
  coins: CalculateCoinProfitData[];
  totalCapital: number;
  totalGrowth: number;
  totalInvested: number;
  investmentPeriod: number;
  monthlyCapitals: IMonthlyCapital[];
}
