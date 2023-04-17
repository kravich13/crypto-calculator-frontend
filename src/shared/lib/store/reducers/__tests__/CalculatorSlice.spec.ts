import { calculatorActions, calculatorReducer } from '../CalculatorSlice';

describe('calculatorSlice', () => {
  const initialState = {
    maxNumberOfCoinsToInvest: 1,
    monthlyInvestment: '',
    startDate: '',
    endDate: '',
  };

  it('should return the initial state on first run', () => {
    const nextState = calculatorReducer(undefined, { type: 'init' });

    expect(nextState).toEqual(initialState);
  });

  it('should clear state correctly', () => {
    const action = calculatorActions.clearState();
    const nextState = calculatorReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should set period and amount correctly', () => {
    const payload = { startDate: '2022-04-01', endDate: '2022-06-30', monthlyInvestment: '500' };
    const action = calculatorActions.setPeriodAndAmount(payload);
    const nextState = calculatorReducer(initialState, action);

    expect(nextState).toEqual({
      maxNumberOfCoinsToInvest: initialState.maxNumberOfCoinsToInvest,
      startDate: payload.startDate,
      endDate: payload.endDate,
      monthlyInvestment: payload.monthlyInvestment,
    });
  });

  it('should set max number of coins to invest correctly', () => {
    const payload = 5;
    const action = calculatorActions.setMaxNumberOfCoinsToInvest(payload);
    const nextState = calculatorReducer(initialState, action);

    expect(nextState).toEqual({
      ...initialState,
      maxNumberOfCoinsToInvest: payload,
    });
  });
});