import { useRefreshTokensMutation } from '@cc/shared/api';
import { RoutesTypes } from '@cc/shared/enums';
import { useEffect } from 'react';
import { useAuthContext } from './context';
import { useAppSelector } from './redux';
import { useErrorMessage } from './useErrorMessage';

export const useCheckValidToken = <T extends Function>(
  inputMessage: string,
  repeatedRequest: T
) => {
  const refreshToken = useAppSelector((state) => state.authReducer.refreshToken);
  const { logout, login } = useAuthContext();
  const [refreshTokens, { data, reset, isLoading, error }] = useRefreshTokensMutation();

  const refreshErrorMessage = useErrorMessage(error);

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
  }, [data]);

  useEffect(() => {
    if (refreshErrorMessage.includes('Invalid refresh token')) {
      logout({ notifyUser: true, redirectTo: RoutesTypes.MAIN });
      reset();
    }
  }, [refreshErrorMessage]);

  return { isLoading, errorMessage: refreshErrorMessage };
};
