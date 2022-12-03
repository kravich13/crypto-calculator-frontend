import React, { createContext, useCallback, useEffect } from 'react';
import { useAppDispatch } from '../hooks';
import { authSlice, calculatorSlice, ITokensData, userDataSlice } from '../store/reducers';

interface IAuthProviderProps {
  children: React.ReactNode;
}

export interface IAuthContext {
  login: (tokensData: ITokensData) => void;
  logout: () => void;
}

export const AuthContext = createContext<IAuthContext | null>(null);

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
