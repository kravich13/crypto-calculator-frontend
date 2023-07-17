import { ICalculateProfitResponse } from '@cc/shared/types';

export interface IProfitSlice extends ICalculateProfitResponse {
  hasData?: boolean;
}
