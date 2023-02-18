import {
  AuthContext,
  authSlice,
  calculatorSlice,
  ITokensData,
  useAppDispatch,
  userDataSlice,
} from '@cc/shared/lib';
import { useCallback, useLayoutEffect } from 'react';

interface IAuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const { setAuth, setNotAuth, clearState } = authSlice.actions;
  const dispatch = useAppDispatch();

  const login = useCallback((tokensData: ITokensData) => {
    dispatch(setAuth(tokensData));
  }, []);

  const logout = useCallback(() => {
    dispatch(clearState());
    dispatch(userDataSlice.actions.clearState());
    dispatch(calculatorSlice.actions.clearState());
  }, []);

  useLayoutEffect(() => {
    try {
      const areTokensData = localStorage.getItem('tokensData');
      const tokensData = areTokensData ? (JSON.parse(areTokensData) as ITokensData) : null;

      if (tokensData && tokensData.refreshTokenExpiresIn > Date.now()) {
        login(tokensData);
      } else {
        dispatch(setNotAuth());
      }
    } catch (err) {
      dispatch(setNotAuth());
      console.warn('Parsing tokensData error.');
    }
  }, []);

  return <AuthContext.Provider value={{ login, logout }}>{children}</AuthContext.Provider>;
};
