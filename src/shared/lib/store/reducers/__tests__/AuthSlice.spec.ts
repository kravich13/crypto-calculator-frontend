import {
  IAuthInitialState,
  IJwtTokensPayload,
  ISetEmailCodeResendExpiresIn,
  ISetEmailInput,
} from '@cc/shared/types';
import { authActions, authReducer } from '../AuthSlice';

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
  removeItem: jest.fn(),
};

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('authSlice', () => {
  const initialState: IAuthInitialState = {
    email: '',
    accessToken: '',
    refreshToken: '',
    emailCodeResendExpiresIn: -1,
    accessTokenExpiresIn: -1,
    refreshTokenExpiresIn: -1,
  };

  beforeEach(() => {
    localStorageMock.clear();
  });

  it('should return the initial state', () => {
    expect(authReducer(undefined, { type: 'init' })).toEqual(initialState);
  });

  it('should handle setNotAuth', () => {
    const currentState: IAuthInitialState = {
      ...initialState,
      isAuth: true,
      accessToken: 'someAccessToken',
      refreshToken: 'someRefreshToken',
    };

    const nextState = authReducer(currentState, authActions.setNotAuth());

    expect(nextState).toEqual({ ...initialState, isAuth: false });
    expect(localStorage.removeItem).toHaveBeenCalledWith('tokensData');
    expect(localStorage.removeItem).toHaveBeenCalledWith('userData');
  });

  it('should handle setAuth', () => {
    const payload: IJwtTokensPayload = {
      accessToken: 'someAccessToken',
      refreshToken: 'someRefreshToken',
      accessTokenExpiresIn: 3600,
      refreshTokenExpiresIn: 7200,
    };

    const nextState = authReducer(initialState, authActions.setAuth(payload));

    expect(nextState).toEqual({
      ...initialState,
      isAuth: true,
      accessToken: payload.accessToken,
      refreshToken: payload.refreshToken,
      accessTokenExpiresIn: payload.accessTokenExpiresIn,
      refreshTokenExpiresIn: payload.refreshTokenExpiresIn,
    });

    expect(localStorage.setItem).toHaveBeenCalledWith('tokensData', JSON.stringify(payload));
  });

  it('should handle setEmail', () => {
    const payload: ISetEmailInput = {
      email: 'test@example.com',
    };

    const nextState = authReducer(initialState, authActions.setEmail(payload));

    expect(nextState).toEqual({ ...initialState, email: payload.email });
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'userData',
      JSON.stringify({ email: payload.email })
    );
  });

  it('should handle setEmailCodeResendExpiresIn', () => {
    const payload: ISetEmailCodeResendExpiresIn = {
      emailCodeResendExpiresIn: 300,
    };

    const currentState: IAuthInitialState = {
      ...initialState,
      email: 'test@example.com',
    };

    const nextState = authReducer(currentState, authActions.setEmailCodeResendExpiresIn(payload));

    expect(nextState).toEqual({
      ...currentState,
      emailCodeResendExpiresIn: payload.emailCodeResendExpiresIn,
    });
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'userData',
      JSON.stringify({ email: currentState.email })
    );
  });
});
