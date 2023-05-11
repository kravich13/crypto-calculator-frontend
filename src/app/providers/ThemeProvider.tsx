import { IChildrenProps } from '@cc/shared/types';
import { ThemeProvider as MuiThemeProvider, useMediaQuery } from '@mui/material';

interface IThemeProviderProps extends IChildrenProps {}

export const ThemeProvider: React.FC<IThemeProviderProps> = ({ children }) => {
  const isDarkOS = useMediaQuery('prefers-color-scheme: dark');

  return <MuiThemeProvider theme={isDarkOS}>{children}</MuiThemeProvider>;
};
