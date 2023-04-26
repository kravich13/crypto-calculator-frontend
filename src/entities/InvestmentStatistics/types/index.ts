import { CalculateCoinProfitData } from '@cc/shared/types';

export type DetailedColumnNameType = Pick<
  CalculateCoinProfitData,
  'name' | 'share' | 'startingPrice' | 'averagePrice' | 'lastPrice' | 'capital' | 'growth'
>;

export type DetailedColumnType = keyof DetailedColumnNameType;

export type DetailedColumnPosition = 'right' | 'left';

export interface DetailedColumnTitleData {
  title: string;
  position: DetailedColumnPosition;
}

export type DetailedColumnTitles = {
  [key in DetailedColumnType]: DetailedColumnTitleData;
};

export interface ISelectedColumnData {
  column: DetailedColumnType;
  isDescending: boolean;
}
