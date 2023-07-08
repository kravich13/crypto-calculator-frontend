import { ThemeContext } from '@cc/shared/lib';
import { IChildrenProps, ThemeMode } from '@cc/shared/types';
import { ThemeProvider as MuiThemeProvider, createTheme, useMediaQuery } from '@mui/material';
import { ukUA } from '@mui/material/locale';
import { useCallback, useEffect, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';

interface IThemeProviderProps extends IChildrenProps {}

export const ThemeProvider: React.FC<IThemeProviderProps> = ({ children }) => {
  const isDarkOS = useMediaQuery('(prefers-color-scheme: dark)');
  const [isMounted, setIsMounted] = useState(false);

  const [themeModeValue, setThemeMode] = useLocalStorage<{ value: ThemeMode }>('themeMode', {
    value: isDarkOS ? 'light' : 'dark',
  });

  const themeMode = themeModeValue.value;

  const theme = createTheme(
    {
      palette: { mode: themeMode },
      components: {
        MuiTypography: {
          styleOverrides: {
            root: { wordWrap: 'break-word' },
          },
        },
        MuiFormHelperText: {
          styleOverrides: {
            root: { wordWrap: 'break-word' },
          },
        },
      },
    },
    ukUA
  );

  const toggleTheme = useCallback(() => {
    switch (themeMode) {
      case 'light':
        setThemeMode((prev) => ({ ...prev, value: 'dark' }));
        break;
      case 'dark':
        setThemeMode((prev) => ({ ...prev, value: 'light' }));
        break;
    }
  }, [setThemeMode, themeMode]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
      {isMounted && <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>}
    </ThemeContext.Provider>
  );
};
