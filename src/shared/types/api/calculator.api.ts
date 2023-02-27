import { ICoinProfitData, IMainCoinInfo } from '../calculator';

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
  coins: (ICoinProfitData & IMainCoinInfo)[];
  totalCapital: number;
  totalGrowth: number;
  totalInvested: number;
  investmentPeriod: number;
}
