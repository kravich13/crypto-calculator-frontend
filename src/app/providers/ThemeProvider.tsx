import { IChildrenProps, ThemeMode } from '@cc/shared/types';
import { ThemeProvider as MuiThemeProvider, createTheme, useMediaQuery } from '@mui/material';
import { useMemo } from 'react';
import { useReadLocalStorage } from 'usehooks-ts';

interface IThemeProviderProps extends IChildrenProps {}

export const ThemeProvider: React.FC<IThemeProviderProps> = ({ children }) => {
  const isDarkOS = useMediaQuery('(prefers-color-scheme: dark)');

  const isThemeMode = useReadLocalStorage<ThemeMode | null>('themeMode');

  const theme = isThemeMode ?? isDarkOS ? 'dark' : 'light';

  const palette = useMemo(() => createTheme({ palette: { mode: theme } }), [theme]);

  return <MuiThemeProvider theme={palette}>{children}</MuiThemeProvider>;
};
