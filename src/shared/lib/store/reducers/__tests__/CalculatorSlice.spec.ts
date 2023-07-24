import { calculatorActions, calculatorReducer } from '../CalculatorSlice';

describe('CalculatorSlice Reducers', () => {
  const initialState = {
    maxNumberOfCoinsToInvest: 1,
    monthlyInvestment: '',
    startDate: 0,
    endDate: 0,
  };

  it('should return the initial state', () => {
    expect(calculatorReducer(undefined, { type: 'init' })).toEqual(initialState);
  });

  it('should handle clearState', () => {
    const currentState = {
      ...initialState,
      maxNumberOfCoinsToInvest: 5,
      monthlyInvestment: '100',
      startDate: 123456789,
      endDate: 987654321,
    };

    const nextState = calculatorReducer(currentState, calculatorActions.clearState());

    expect(nextState).toEqual(initialState);
  });

  it('should handle setPeriodAndAmount', () => {
    const payload = {
      startDate: 123456789,
      endDate: 987654321,
      monthlyInvestment: '100',
    };

    const nextState = calculatorReducer(
      initialState,
      calculatorActions.setPeriodAndAmount(payload)
    );

    expect(nextState).toEqual({
      ...initialState,
      startDate: payload.startDate,
      endDate: payload.endDate,
      monthlyInvestment: payload.monthlyInvestment,
    });
  });

  it('should handle setMaxNumberOfCoinsToInvest', () => {
    const payload = 10;

    const nextState = calculatorReducer(
      initialState,
      calculatorActions.setMaxNumberOfCoinsToInvest(payload)
    );

    expect(nextState).toEqual({
      ...initialState,
      maxNumberOfCoinsToInvest: payload,
    });
  });
});
