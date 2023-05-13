import { IAuthContext, IThemeContext } from '@cc/shared/types';
import { createContext } from 'react';

export const AuthContext = createContext<IAuthContext | null>(null);
export const ThemeContext = createContext<IThemeContext | null>(null);
