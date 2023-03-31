import { IJwtTokensPayload } from '@cc/shared/types';
import { authActions, authReducer } from '../AuthSlice';

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
  removeItem: jest.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

const initialTokens: IJwtTokensPayload = {
  accessToken: '',
  refreshToken: '',
  accessTokenExpiresIn: -1,
  refreshTokenExpiresIn: -1,
};

describe('authSlice', () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  it('setNotAuth should remove tokens data from localStorage', () => {
    localStorageMock.setItem('tokensData', JSON.stringify(initialTokens));
    const expectedState = { ...initialTokens, isAuth: false };

    expect(authReducer(initialTokens, authActions.setNotAuth())).toEqual(expectedState);
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('tokensData');
  });

  it('setAuth should set tokens data in localStorage', () => {
    const tokensData: IJwtTokensPayload = {
      accessToken: 'access_token',
      refreshToken: 'refresh_token',
      accessTokenExpiresIn: 3600,
      refreshTokenExpiresIn: 36000,
    };
    const expectedState = { ...tokensData, isAuth: true };

    expect(authReducer(initialTokens, authActions.setAuth(tokensData))).toEqual(expectedState);
    expect(localStorageMock.setItem).toHaveBeenCalledWith('tokensData', JSON.stringify(tokensData));
  });
});
