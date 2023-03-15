import { IAuthContext } from '@cc/shared/types';
import { createContext } from 'react';

export const AuthContext = createContext<IAuthContext | null>(null);
