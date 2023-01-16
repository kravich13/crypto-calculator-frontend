import { RelativeRoutingType, useNavigate } from 'react-router-dom';
import { RoutesTypes } from '../navigation';

interface NavigateFunction {
  (
    to: RoutesTypes,
    options?: {
      replace?: boolean;
      state?: any;
      relative?: RelativeRoutingType;
    }
  ): void;
  (delta: number): void;
}

export const useTypedNavigate = () => {
  const navigate: NavigateFunction = useNavigate();

  return navigate;
};
