import { RoutesTypes } from '@cc/shared/enums';
import { IJwtTokensPayload, LocalStorageUserData, ThemeMode } from '../store';
import { SelectChangeEvent } from '@mui/material';

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
  userData?: LocalStorageUserData | null;
}

export interface IThemeContext {
  themeMode: ThemeMode;
  toggleTheme: () => void;
  toggleLanguage: (event: SelectChangeEvent) => void;
}
