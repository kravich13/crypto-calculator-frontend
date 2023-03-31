import { RoutesTypes } from '@cc/shared/enums';
import { IChildrenProps } from '@cc/shared/types';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface IRedirectTo {
  redirectTo: RoutesTypes;
  condition: boolean;
}

type ProtectedPropsType = IRedirectTo & IChildrenProps;

const ProtectedComponent: React.FC<ProtectedPropsType> = ({ children, redirectTo, condition }) => {
  const router = useRouter();

  useEffect(() => {
    if (condition) {
      router.push(redirectTo);
    }
  }, [condition, router, redirectTo]);

  return condition ? <>{children}</> : null;
};

export const ProtectedPage: React.FC<ProtectedPropsType> = (props) => (
  <ProtectedComponent {...props} />
);
