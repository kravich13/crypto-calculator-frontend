import { RoutesTypes } from '@cc/shared/enums';
import { useAppSelector } from '@cc/shared/lib';
import { IChildrenProps } from '@cc/shared/types';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { PageLayout } from './PageLayout';

interface IRedirectTo {
  redirectTo?: RoutesTypes;
}

type AuthPropsType = IRedirectTo & IChildrenProps;

const AuthComponent: React.FC<AuthPropsType> = ({ children, redirectTo = RoutesTypes.MAIN }) => {
  const router = useRouter();
  const isAuth = useAppSelector(({ authReducer }) => authReducer.isAuth);

  useEffect(() => {
    if (isAuth === false) {
      router.push(redirectTo);
    }
  }, [isAuth, router, redirectTo]);

  return isAuth ? <>{children}</> : <PageLayout>{}</PageLayout>;
};

export const AuthPage: React.FC<AuthPropsType> = (props) => <AuthComponent {...props} />;
