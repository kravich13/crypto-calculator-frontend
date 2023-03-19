import {
  authActions,
  AuthContext,
  calculatorActions,
  profitActions,
  useAppDispatch,
  userDataActions,
} from '@cc/shared/lib';
import { IAuthContentLoginData, IAuthContextLogoutData, IJwtTokensPayload } from '@cc/shared/types';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';

interface IAuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [showModalLogout, setShowModalLogout] = useState(false);
  const [showModalLogin, setShowModalLogin] = useState(false);

  const login = useCallback(({ tokensData, notifyUser, redirectTo }: IAuthContentLoginData) => {
    if (notifyUser) {
      setShowModalLogin(true);

      setTimeout(() => {
        if (redirectTo) {
          dispatch(authActions.setAuth(tokensData));
          router.push(redirectTo);
        }

        setShowModalLogin(false);
      }, 5000);
    } else {
      dispatch(authActions.setAuth(tokensData));

      if (redirectTo) {
        router.push(redirectTo);
      }
    }
  }, []);

  const clearStates = useCallback(() => {
    dispatch(authActions.setNotAuth());
    dispatch(userDataActions.clearState());
    dispatch(calculatorActions.clearState());
    dispatch(profitActions.clearState());
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

      if (
        tokens &&
        tokens.accessTokenExpiresIn < Date.now() &&
        tokens.refreshTokenExpiresIn < Date.now()
      ) {
        tokens = null;
      }
    } catch (err) {
      console.warn('Parsing tokensData error.');
    }

    return tokens;
  }, []);

  useEffect(() => {
    if (tokensPayload) {
      login({ tokensData: tokensPayload });
    } else {
      dispatch(authActions.setNotAuth());
    }
  }, [tokensPayload]);

  return (
    <AuthContext.Provider value={{ showModalLogout, showModalLogin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
