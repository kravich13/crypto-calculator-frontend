import { createContext } from 'react';
import { ITokensData } from '../store';

export interface IAuthContext {
  login: (tokensData: ITokensData) => void;
  logout: () => void;
}

export const AuthContext = createContext<IAuthContext | null>(null);
