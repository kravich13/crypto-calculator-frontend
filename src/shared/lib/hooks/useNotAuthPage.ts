import { RoutesTypes } from '@cc/shared/types';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAppSelector } from './redux';

interface IUseNotAuthPageProps {
  redirectTo: RoutesTypes;
}

export const useNotAuthPage = ({ redirectTo }: IUseNotAuthPageProps) => {
  const router = useRouter();
  const isAuth = useAppSelector((state) => state.authReducer.isAuth);

  useEffect(() => {
    if (isAuth) {
      router.push(redirectTo);
    }
  }, [isAuth, redirectTo]);

  return { showContent: isAuth === false };
};
