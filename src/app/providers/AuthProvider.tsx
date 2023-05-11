import {
  authActions,
  AuthContext,
  calculatorActions,
  profitActions,
  useAppDispatch,
  userDataActions,
} from '@cc/shared/lib';
import {
  IAuthContentLoginData,
  IAuthContextLogoutData,
  IChildrenProps,
  IJwtTokensPayload,
  LocalStorageUserData,
} from '@cc/shared/types';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useReadLocalStorage } from 'usehooks-ts';

const LOG_IN_OUT_DELAY = 2500;

interface IAuthProviderProps extends IChildrenProps {}

export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [showModalLogout, setShowModalLogout] = useState(false);
  const [showModalLogin, setShowModalLogin] = useState(false);

  const tokensPayload = useReadLocalStorage<IJwtTokensPayload | null>('tokensData');
  const userData = useReadLocalStorage<LocalStorageUserData | null>('userData');

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

  useEffect(() => {
    if (tokensPayload && userData) {
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
