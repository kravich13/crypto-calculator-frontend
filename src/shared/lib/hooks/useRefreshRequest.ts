import { useRefreshTokensMutation } from '@cc/shared/api';
import { RoutesTypes } from '@cc/shared/enums';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { useEffect } from 'react';
import { useAuthContext } from './context';
import { useAppSelector } from './redux';
import { useErrorMessage } from './useErrorMessage';

export const useRefreshRequest = (
  inputError: FetchBaseQueryError | SerializedError | undefined,
  repeatedRequest: Function
) => {
  const isAuth = useAppSelector(({ authReducer }) => authReducer.isAuth);
  const refreshToken = useAppSelector((state) => state.authReducer.refreshToken);

  const { logout, login } = useAuthContext();
  const [refreshTokens, { data, reset, isLoading, error }] = useRefreshTokensMutation();

  const inputCustomError = useErrorMessage(inputError);
  const refreshError = useErrorMessage(error);

  const inputMessage = inputCustomError.message;
  const refreshMessage = refreshError.message;

  useEffect(() => {
    if (inputMessage.includes('Invalid access token')) {
      refreshTokens({ refreshToken });
    }
  }, [inputMessage, refreshToken]);

  useEffect(() => {
    if (data) {
      login({ tokensData: data });
      reset();

      repeatedRequest();
    }
  }, [data, repeatedRequest]);

  useEffect(() => {
    if (refreshMessage.includes('Invalid refresh token') && isAuth) {
      logout({ notifyUser: true, redirectTo: RoutesTypes.MAIN });
      reset();
    }
  }, [refreshMessage, isAuth]);

  return { isLoading, error: inputCustomError || refreshError };
};
