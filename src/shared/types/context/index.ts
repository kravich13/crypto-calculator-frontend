import { RoutesTypes } from '@cc/shared/enums';

export interface IAuthContextLogoutData {
  notifyUser?: boolean;
  redirectTo?: RoutesTypes;
}
