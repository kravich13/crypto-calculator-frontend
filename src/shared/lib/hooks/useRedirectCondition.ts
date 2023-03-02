import { RoutesTypes } from '@cc/shared/enums';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface IUseRedirectConditionProps {
  condition?: boolean;
  redirectTo: RoutesTypes;
}

export const useRedirectCondition = ({
  condition = true,
  redirectTo,
}: IUseRedirectConditionProps) => {
  const router = useRouter();

  useEffect(() => {
    if (condition) {
      router.push(redirectTo);
    }
  }, [condition, redirectTo]);

  return { showContent: !condition };
};
