import { IAuthContext } from '@cc/shared/types';
import { useContext } from 'react';
import { AuthContext } from '../context';

export const useAuthContext = () => useContext(AuthContext) as IAuthContext;
