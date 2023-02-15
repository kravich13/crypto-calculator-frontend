import { RoutesTypes } from '@cc/shared/types';
import { useRouter } from 'next/router';
import { useLayoutEffect } from 'react';
import { useAppSelector } from './redux';

interface IUseAuthPageProps {
  redirectTo: RoutesTypes;
}

export const useAuthPage = ({ redirectTo }: IUseAuthPageProps) => {
  const router = useRouter();
  const isAuth = useAppSelector((state) => state.authReducer.isAuth);

  useLayoutEffect(() => {
    if (!isAuth) {
      router.push(redirectTo);
    }
  }, [isAuth, redirectTo, router]);
};
