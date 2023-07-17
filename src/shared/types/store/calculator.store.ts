export interface IPeriodAndAmountForm {
  startDate: number;
  endDate: number;
  monthlyInvestment: string;
}

export interface ICalculatorSlice extends IPeriodAndAmountForm {
  maxNumberOfCoinsToInvest: number;
}
