import {
  AuthContext,
  authSlice,
  baseCalculatorSlice,
  profitSlice,
  useAppDispatch,
  userDataSlice,
} from '@cc/shared/lib';
import { IAuthContentLoginData, IAuthContextLogoutData, IJwtTokensPayload } from '@cc/shared/types';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

interface IAuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const { setAuth, setNotAuth } = authSlice.actions;
  const dispatch = useAppDispatch();
  const router = useRouter();

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
    dispatch(authSlice.actions.clearState());
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

  useEffect(() => {
    try {
      const areTokensData = localStorage.getItem('tokensData');
      const tokensData = areTokensData ? (JSON.parse(areTokensData) as IJwtTokensPayload) : null;
      if (tokensData && tokensData.refreshTokenExpiresIn > Date.now()) {
        login({ tokensData });
      } else {
        // dispatch(setNotAuth());
      }
    } catch (err) {
      // dispatch(setNotAuth());
      console.warn('Parsing tokensData error.');
    }
  }, []);

  return (
    <AuthContext.Provider value={{ showModalLogout, showModalLogin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
