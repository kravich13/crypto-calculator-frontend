import { IAuthContext, IThemeContext } from '@cc/shared/types';
import { useContext } from 'react';
import { AuthContext, ThemeContext } from '../context';

export const useAuthContext = () => useContext(AuthContext) as IAuthContext;
export const useThemeContext = () => useContext(ThemeContext) as IThemeContext;
