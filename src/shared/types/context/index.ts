import { RoutesTypes } from '@cc/shared/enums';
import { IJwtTokensPayload } from '../store';

export interface IAuthContext {
  showModalLogout: boolean;
  showModalLogin: boolean;
  login: (loginData: IAuthContentLoginData) => void;
  logout: (logoutData: IAuthContextLogoutData) => void;
}

export interface IAuthContextLogoutData {
  notifyUser?: boolean;
  redirectTo?: RoutesTypes;
}

export interface IAuthContentLoginData extends IAuthContextLogoutData {
  tokensData: IJwtTokensPayload;
}
