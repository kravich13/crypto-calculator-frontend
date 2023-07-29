import 'whatwg-fetch';

import { useRefreshTokensMutation } from '@cc/shared/api';
import { IJwtTokensPayload, IRefreshTokensResponse } from '@cc/shared/types';
import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { useAuthContext } from '../context';
import { useAppSelector } from '../redux';
import { useErrorMessage } from '../useErrorMessage';
import { useRefreshRequest } from '../useRefreshRequest';

jest.useFakeTimers();

jest.mock('@cc/shared/api');
jest.mock('../context');
jest.mock('../useErrorMessage');
jest.mock('../redux');

describe('useRefreshRequest', () => {
  const inputError = {
    data: { errors: [{ message: 'Invalid access token' }] },
    status: 401,
  };

  const refreshTokensData: IJwtTokensPayload = {
    accessToken: 'access_token',
    refreshToken: 'refresh_token',
    accessTokenExpiresIn: 123,
    refreshTokenExpiresIn: 123,
  };

  const refreshTokenError = {
    data: { errors: [{ message: 'Invalid refresh token' }] },
    status: 401,
  };

  const mockUseAuthContext = {
    logout: jest.fn(),
    login: jest.fn(),
  };

  const mockRepeatedRequest = jest.fn();

  beforeEach(() => {
    (useAuthContext as jest.Mock).mockReturnValue({
      logout: mockUseAuthContext.logout,
      login: mockUseAuthContext.login,
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should call refreshTokens', async () => {
    mockAppSelectors({ isAuth: true, refreshToken: 'refresh_token' });
    mockErrorMessages({ inputErrorMessage: 'Invalid access token' });

    mockRefreshTokens({ data: refreshTokensData, error: refreshTokenError });

    callRenderHook(inputError, mockRepeatedRequest);

    expect(useRefreshTokensMutation).toHaveBeenCalled();
  });

  it('should call repeatedRequest and login', async () => {
    mockAppSelectors({ isAuth: true, refreshToken: 'refresh_token' });
    mockErrorMessages({ inputErrorMessage: 'Invalid access token' });

    mockRefreshTokens({ data: refreshTokensData, error: refreshTokenError });

    callRenderHook(inputError, mockRepeatedRequest);

    expect(useRefreshTokensMutation).toHaveBeenCalled();

    expect(mockUseAuthContext.login).toHaveBeenCalled();
    expect(mockRepeatedRequest).toHaveBeenCalled();
  });

  it('should call logout if isAuth === true', async () => {
    mockAppSelectors({ isAuth: true, refreshToken: 'refresh_token' });
    mockErrorMessages({
      inputErrorMessage: 'Invalid access token',
      refreshErrorMessage: 'Invalid refresh token',
    });

    mockRefreshTokens({ data: refreshTokensData, error: refreshTokenError });

    callRenderHook(inputError, mockRepeatedRequest);

    expect(useRefreshTokensMutation).toHaveBeenCalled();

    expect(mockUseAuthContext.login).toHaveBeenCalled();
    expect(mockRepeatedRequest).toHaveBeenCalled();

    expect(mockUseAuthContext.logout).toHaveBeenCalled();
  });

  it('should not call logout if isAuth !== true', async () => {
    mockAppSelectors({ isAuth: false, refreshToken: 'refresh_token' });
    mockErrorMessages({
      inputErrorMessage: 'Invalid access token',
      refreshErrorMessage: 'Invalid refresh token',
    });

    mockRefreshTokens({ data: refreshTokensData, error: refreshTokenError });

    callRenderHook(inputError, mockRepeatedRequest);

    expect(useRefreshTokensMutation).toHaveBeenCalled();

    expect(mockUseAuthContext.login).toHaveBeenCalled();
    expect(mockRepeatedRequest).toHaveBeenCalled();

    expect(mockUseAuthContext.logout).not.toHaveBeenCalled();
  });

  interface IMockAppSelectorsProps {
    isAuth?: boolean;
    refreshToken?: string;
  }

  interface IMockErrorMessagesProps {
    inputErrorMessage?: string;
    refreshErrorMessage?: string;
  }

  interface IMockRefreshTokensProps {
    data?: IRefreshTokensResponse;
    error?: any;
  }

  function callRenderHook(inputError: any, repeatedRequest: any) {
    return act(() => {
      renderHook(() => useRefreshRequest(inputError, repeatedRequest));
    });
  }

  function mockAppSelectors({ isAuth, refreshToken = '' }: IMockAppSelectorsProps) {
    (useAppSelector as jest.Mock).mockReturnValueOnce(isAuth);
    (useAppSelector as jest.Mock).mockReturnValueOnce(refreshToken);
  }

  function mockErrorMessages({
    inputErrorMessage = '',
    refreshErrorMessage = '',
  }: IMockErrorMessagesProps) {
    (useErrorMessage as jest.Mock).mockReturnValueOnce({
      message: inputErrorMessage,
      showError: false,
    });

    (useErrorMessage as jest.Mock).mockReturnValueOnce({
      message: refreshErrorMessage,
      showError: false,
    });
  }

  function mockRefreshTokens({ data, error }: IMockRefreshTokensProps) {
    (useRefreshTokensMutation as jest.Mock).mockReturnValue([
      jest.fn(),
      {
        reset: jest.fn(),
        isLoading: false,
        data,
        error,
      },
    ]);
  }
});
