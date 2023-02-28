import { RoutesTypes } from '@cc/shared/enums';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAppSelector } from './redux';

interface IUseAuthPageProps {
  redirectTo: RoutesTypes;
}

export const useAuthPage = ({ redirectTo }: IUseAuthPageProps) => {
  const router = useRouter();
  const isAuth = useAppSelector((state) => state.authReducer.isAuth);

  useEffect(() => {
    if (isAuth === false) {
      router.push(redirectTo);
    }
  }, [isAuth, redirectTo]);

  return { showContent: isAuth === true };
};
