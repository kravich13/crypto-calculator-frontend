import { useRefreshTokensMutation } from '@cc/shared/api';
import {
  AuthContext,
  authSlice,
  baseCalculatorSlice,
  profitSlice,
  useAppDispatch,
  userDataSlice,
} from '@cc/shared/lib';
import { IAuthContentLoginData, IAuthContextLogoutData, IJwtTokensPayload } from '@cc/shared/types';
import { QueryStatus } from '@reduxjs/toolkit/dist/query';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';

interface IAuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const { setAuth, setNotAuth } = authSlice.actions;
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [refreshTokens, { data: resJWTPayload, status }] = useRefreshTokensMutation();

  const [showModalLogout, setShowModalLogout] = useState(false);
  const [showModalLogin, setShowModalLogin] = useState(false);

  const login = useCallback(({ tokensData, notifyUser, redirectTo }: IAuthContentLoginData) => {
    if (notifyUser) {
      setShowModalLogin(true);

      setTimeout(() => {
        if (redirectTo) {
          dispatch(setAuth(tokensData));
          router.push(redirectTo);
        }

        setShowModalLogin(false);
      }, 5000);
    } else {
      dispatch(setAuth(tokensData));

      if (redirectTo) {
        router.push(redirectTo);
      }
    }
  }, []);

  const clearStates = useCallback(() => {
    dispatch(authSlice.actions.setNotAuth());
    dispatch(userDataSlice.actions.clearState());
    dispatch(baseCalculatorSlice.actions.clearState());
    dispatch(profitSlice.actions.clearState());
  }, []);

  const logout = useCallback(({ notifyUser, redirectTo }: IAuthContextLogoutData) => {
    if (notifyUser) {
      setShowModalLogout(true);

      setTimeout(() => {
        clearStates();

        if (redirectTo) {
          router.push(redirectTo);
        }

        setShowModalLogout(false);
      }, 5000);
    } else {
      clearStates();

      if (redirectTo) {
        router.push(redirectTo);
      }
    }
  }, []);

  const tokensPayload = useMemo(() => {
    let tokens: IJwtTokensPayload | null = null;

    try {
      const areTokensData = localStorage.getItem('tokensData');
      tokens = areTokensData ? (JSON.parse(areTokensData) as IJwtTokensPayload) : null;

      if (tokens && tokens.refreshTokenExpiresIn < Date.now()) {
        tokens = null;
      }
    } catch (err) {
      console.warn('Parsing tokensData error.');
    }

    return tokens;
  }, []);

  useEffect(() => {
    if (tokensPayload) {
      refreshTokens({ refreshToken: tokensPayload.refreshToken });
    } else {
      dispatch(setNotAuth());
    }
  }, [tokensPayload]);

  useEffect(() => {
    if (status === QueryStatus.rejected) {
      dispatch(setNotAuth());
    } else if (status === QueryStatus.fulfilled && resJWTPayload) {
      login({ tokensData: resJWTPayload });
    }
  }, [status, resJWTPayload]);

  return (
    <AuthContext.Provider value={{ showModalLogout, showModalLogin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
