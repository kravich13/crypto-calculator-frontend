export interface IMainMockData {
  name: string;
  ticker: string;
}

export interface IMockData extends IMainMockData {
  id: string;
}

export interface ISelectedInvestCoin extends IMainMockData {
  percent: string;
  primaryId: string;
}

export interface ISelectedInvestCoinsForm {
  addedCoins: ISelectedInvestCoin[];
}
