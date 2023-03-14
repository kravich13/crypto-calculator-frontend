import { IAuthContextLogoutData, IJwtTokensPayload } from '@cc/shared/types';
import { createContext } from 'react';

export interface IAuthContext {
  showModalLogout: boolean;
  login: (tokensData: IJwtTokensPayload) => void;
  logout: (logoutData: IAuthContextLogoutData) => void;
}

export const AuthContext = createContext<IAuthContext | null>(null);
