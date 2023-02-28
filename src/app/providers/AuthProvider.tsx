import {
  AuthContext,
  authSlice,
  baseCalculatorSlice,
  profitSlice,
  useAppDispatch,
  userDataSlice,
} from '@cc/shared/lib';
import { ITokensData } from '@cc/shared/types';
import { useCallback, useEffect } from 'react';

interface IAuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const { setAuth, setNotAuth } = authSlice.actions;
  const dispatch = useAppDispatch();

  const login = useCallback((tokensData: ITokensData) => {
    dispatch(setAuth(tokensData));
  }, []);

  const logout = useCallback(() => {
    dispatch(authSlice.actions.clearState());
    dispatch(userDataSlice.actions.clearState());
    dispatch(baseCalculatorSlice.actions.clearState());
    dispatch(profitSlice.actions.clearState());
  }, []);

  useEffect(() => {
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
