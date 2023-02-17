import { RoutesTypes } from '@cc/shared/types';
import { useRouter } from 'next/navigation';
import { useLayoutEffect } from 'react';
import { useAppSelector } from './redux';

interface IUseNotAuthPageProps {
  redirectTo: RoutesTypes;
}

export const useNotAuthPage = ({ redirectTo }: IUseNotAuthPageProps) => {
  const router = useRouter();
  const isAuth = useAppSelector((state) => state.authReducer.isAuth);

  useLayoutEffect(() => {
    if (isAuth) {
      router.push(redirectTo);
    }
  }, [isAuth, redirectTo]);
};
