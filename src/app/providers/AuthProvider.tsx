import {
  authActions,
  AuthContext,
  calculatorActions,
  profitActions,
  useAppDispatch,
  userDataActions,
} from '@cc/shared/lib';
import { isTokensData, isUserData } from '@cc/shared/type-guards';
import {
  IAuthContentLoginData,
  IAuthContextLogoutData,
  IChildrenProps,
  IJwtTokensPayload,
  LocalStorageUserData,
} from '@cc/shared/types';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';

const LOG_IN_OUT_DELAY = 2500;

interface IAuthProviderProps extends IChildrenProps {}

export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [showModalLogout, setShowModalLogout] = useState(false);
  const [showModalLogin, setShowModalLogin] = useState(false);

  const setAuthData = useCallback(
    (tokensData: IJwtTokensPayload, userData?: LocalStorageUserData | null) => {
      dispatch(authActions.setAuth(tokensData));

      if (userData?.email) {
        dispatch(userDataActions.setEmail({ email: userData.email }));
      }
    },
    []
  );

  const login = useCallback(
    ({ tokensData, notifyUser, redirectTo, userData }: IAuthContentLoginData) => {
      if (notifyUser) {
        setShowModalLogin(true);

        setTimeout(() => {
          if (redirectTo) {
            setAuthData(tokensData, userData);
            router.push(redirectTo);
          }

          setShowModalLogin(false);
        }, LOG_IN_OUT_DELAY);
      } else {
        setAuthData(tokensData, userData);

        if (redirectTo) {
          router.push(redirectTo);
        }
      }
    },
    []
  );

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
      }, LOG_IN_OUT_DELAY);
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
      const tokensDataString = localStorage.getItem('tokensData');
      const tokensData = tokensDataString ? JSON.parse(tokensDataString) : null;

      if (tokensData && isTokensData(tokensData)) {
        tokens = tokensData;

        if (tokens.accessTokenExpiresIn < Date.now() && tokens.refreshTokenExpiresIn < Date.now()) {
          tokens = null;
        }
      }
    } catch (err) {
      console.warn('Parsing tokensData error.');
    }

    return tokens;
  }, []);

  const userData = useMemo(() => {
    let data: LocalStorageUserData | null = null;

    try {
      const userDataString = localStorage.getItem('userData');
      const userData = userDataString ? JSON.parse(userDataString) : null;

      if (userData && isUserData(userData)) {
        data = userData;
      }
    } catch (err) {
      console.warn('Parsing userData error.');
    }

    return data;
  }, []);

  useEffect(() => {
    if (tokensPayload) {
      login({ tokensData: tokensPayload, userData });
    } else {
      dispatch(authActions.setNotAuth());
    }
  }, [tokensPayload, userData]);

  return (
    <AuthContext.Provider value={{ showModalLogout, showModalLogin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
