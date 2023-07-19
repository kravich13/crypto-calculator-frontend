import { ThemeContext } from '@cc/shared/lib';
import { IChildrenProps, ThemeMode } from '@cc/shared/types';
import {
  ThemeProvider as MuiThemeProvider,
  SelectChangeEvent,
  createTheme,
  useMediaQuery,
} from '@mui/material';
import { LocalizationProvider, enUS, ukUA } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';

interface IThemeProviderProps extends IChildrenProps {}

export const ThemeProvider: React.FC<IThemeProviderProps> = ({ children }) => {
  const isDarkOS = useMediaQuery('(prefers-color-scheme: dark)');
  const [isMounted, setIsMounted] = useState(false);

  const [themeModeValue, setThemeMode] = useLocalStorage<{ value: ThemeMode }>('themeMode', {
    value: isDarkOS ? 'light' : 'dark',
  });

  const {
    i18n: { language },
  } = useTranslation();

  const locale = language === 'ua' ? ukUA : enUS;
  const adapterLocale = language === 'ua' ? 'uk-ua' : 'en-us';

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
    locale
  );

  const { pathname, asPath, push } = useRouter();

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

  const toggleLanguage = useCallback(
    (event: SelectChangeEvent) => {
      push(pathname, asPath, { locale: event.target.value });
    },
    [asPath, pathname]
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme, toggleLanguage }}>
      <LocalizationProvider
        dateAdapter={AdapterLuxon}
        adapterLocale={adapterLocale}
        localeText={ukUA.components.MuiLocalizationProvider.defaultProps.localeText}
      >
        {isMounted && <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>}
      </LocalizationProvider>
    </ThemeContext.Provider>
  );
};
