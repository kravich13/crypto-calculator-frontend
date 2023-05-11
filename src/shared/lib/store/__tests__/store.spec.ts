import { authAPI, calculatorAPI } from '@cc/shared/api';
import { authActions, calculatorActions } from '../reducers';
import { setupStore } from '../store';

describe('store', () => {
  let store: ReturnType<typeof setupStore>;

  beforeAll(() => {
    store = setupStore();
  });

  it('should be initialized', () => {
    expect(store).toBeDefined();
  });

  it('should have correct initial state', () => {
    const state = store.getState();
    expect(state.authReducer).toBeDefined();
    expect(state.userDataReducer).toBeDefined();
    expect(state.baseCalculatorReducer).toBeDefined();
    expect(state.profitReducer).toBeDefined();
    expect(state[authAPI.reducerPath]).toBeDefined();
    expect(state[calculatorAPI.reducerPath]).toBeDefined();
  });

  it('should dispatch actions correctly', () => {
    store.dispatch(
      authActions.setAuth({
        accessToken: 'access_token',
        refreshToken: 'refresh_token',
        accessTokenExpiresIn: 13343434343,
        refreshTokenExpiresIn: 13343434343,
      })
    );
    expect(store.getState().authReducer.isAuth).toBeTruthy();

    store.dispatch(authActions.setEmail({ email: 'example@test.com' }));
    expect(store.getState().authReducer.email).toBe('example@test.com');

    store.dispatch(calculatorActions.setMaxNumberOfCoinsToInvest(10));
    expect(store.getState().baseCalculatorReducer.maxNumberOfCoinsToInvest).toBe(10);
  });
});
