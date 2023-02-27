import { ICoinProfitData, IMainCoinInfo } from '../calculator';

export interface IPeriodAndAmountRequest {
  monthlyInvestment: number;
  startDate: number;
  endDate: number;
}

export interface IPeriodAndAmountResponse {
  maxNumberOfCoinsToInvest: number;
}

export type CoinSearchRequest = {
  searchText: string;
  limit: number;
}[];

export type CoinSearchResponse = IMainCoinInfo[];

export interface ICalculateProfitRequest {
  coinId: string;
  share: number;
}

export interface ICalculateProfitResponse {
  coins: (ICoinProfitData & IMainCoinInfo)[];
  totalCapital: number;
  totalGrowth: number;
  totalInvested: number;
  investmentPeriod: number;
}
