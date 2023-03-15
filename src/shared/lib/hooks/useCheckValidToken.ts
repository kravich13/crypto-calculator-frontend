import { useRefreshTokensMutation } from '@cc/shared/api';
import { RoutesTypes } from '@cc/shared/enums';
import { useEffect } from 'react';
import { useAuthContext } from './context';
import { useAppSelector } from './redux';

export const useCheckValidToken = <T extends Function>(message: string, repeatedRequest: T) => {
  const refreshToken = useAppSelector((state) => state.authReducer.refreshToken);
  const { logout, login } = useAuthContext();
  const [refreshTokens, { data, reset }] = useRefreshTokensMutation();

  useEffect(() => {
    if (message.includes('Invalid refresh token')) {
      logout({ notifyUser: true, redirectTo: RoutesTypes.MAIN });
    } else if (message.includes('Invalid access token')) {
      refreshTokens({ refreshToken });
    }
  }, [message, refreshToken]);

  useEffect(() => {
    if (data) {
      login({ tokensData: data });
      reset();

      repeatedRequest();
    }
  }, [data]);
};
