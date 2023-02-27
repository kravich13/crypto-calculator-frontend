import { IMainCoinInfo } from '@cc/shared/types';

export interface ISelectedInvestCoin extends IMainCoinInfo {
  percent: string;
}

export interface ISelectedInvestCoinsForm {
  addedCoins: ISelectedInvestCoin[];
}
