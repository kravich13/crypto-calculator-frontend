import { useContext } from 'react';
import { AuthContext, IAuthContext } from '../context';

export const useAuthContext = () => useContext(AuthContext) as IAuthContext;
