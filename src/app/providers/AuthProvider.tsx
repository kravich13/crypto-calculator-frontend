import { AuthContext } from '@cc/shared/lib/context';
import { useAppDispatch } from '@cc/shared/lib/hooks';
import { authSlice, calculatorSlice, ITokensData, userDataSlice } from '@cc/shared/lib/store';
import { useCallback, useEffect } from 'react';

interface IAuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const { setAuth, clearState } = authSlice.actions;
  const dispatch = useAppDispatch();

  const login = useCallback((tokensData: ITokensData) => {
    dispatch(setAuth(tokensData));
  }, []);

  const logout = useCallback(() => {
    dispatch(clearState());
    dispatch(userDataSlice.actions.clearState());
    dispatch(calculatorSlice.actions.clearState());
  }, []);

  useEffect(() => {
    try {
      const areTokensData = localStorage.getItem('tokensData');
      const tokensData = areTokensData ? (JSON.parse(areTokensData) as ITokensData) : null;

      if (tokensData && tokensData.refreshTokenExpiresIn > Date.now()) {
        login(tokensData);
      }
    } catch (err) {
      console.warn('Parsing tokensData error.');
    }
  }, []);

  return <AuthContext.Provider value={{ login, logout }}>{children}</AuthContext.Provider>;
};
