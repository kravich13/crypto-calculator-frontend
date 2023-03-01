import { IAuthContextLogoutData, ITokensData } from '@cc/shared/types';
import { createContext } from 'react';

export interface IAuthContext {
  showModalLogout: boolean;
  login: (tokensData: ITokensData) => void;
  logout: (logoutData: IAuthContextLogoutData) => void;
}

export const AuthContext = createContext<IAuthContext | null>(null);
