import { RoutesTypes } from '@cc/shared/enums';
import { useAppSelector } from '@cc/shared/lib';
import { IChildrenProps } from '@cc/shared/types';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface IRedirectTo {
  redirectTo?: RoutesTypes;
}

type NotAuthPropsType = IRedirectTo & IChildrenProps;

const NotAuthComponent: React.FC<NotAuthPropsType> = ({
  children,
  redirectTo = RoutesTypes.MAIN,
}) => {
  const router = useRouter();
  const isAuth = useAppSelector(({ authReducer }) => authReducer.isAuth);

  useEffect(() => {
    if (isAuth === true) {
      router.push(redirectTo);
    }
  }, [isAuth, router, redirectTo]);

  return !isAuth ? <>{children}</> : null;
};

export const NotAuthPage: React.FC<NotAuthPropsType> = (props) => <NotAuthComponent {...props} />;
