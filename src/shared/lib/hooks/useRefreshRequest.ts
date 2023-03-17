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
  const { logout, login } = useAuthContext();
  const refreshToken = useAppSelector((state) => state.authReducer.refreshToken);
  const [refreshTokens, { data, reset, isLoading, error }] = useRefreshTokensMutation();

  const inputErrorMessage = useErrorMessage(inputError);
  const refreshErrorMessage = useErrorMessage(error);

  useEffect(() => {
    if (inputErrorMessage.includes('Invalid access token')) {
      refreshTokens({ refreshToken });
    }
  }, [inputErrorMessage, refreshToken]);

  useEffect(() => {
    if (data) {
      login({ tokensData: data });
      reset();

      repeatedRequest();
    }
  }, [data, repeatedRequest]);

  useEffect(() => {
    if (refreshErrorMessage.includes('Invalid refresh token')) {
      logout({ notifyUser: true, redirectTo: RoutesTypes.MAIN });
      reset();
    }
  }, [refreshErrorMessage]);

  return { isLoading, errorMessage: inputErrorMessage || refreshErrorMessage };
};
