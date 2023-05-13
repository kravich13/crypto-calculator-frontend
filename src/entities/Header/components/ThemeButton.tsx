import { useThemeContext } from '@cc/shared/lib';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { memo } from 'react';

export const ThemeButton = memo(() => {
  const { themeMode, toggleTheme } = useThemeContext();

  return (
    <>
      {themeMode === 'light' ? (
        <DarkModeIcon cursor="pointer" onClick={toggleTheme} />
      ) : (
        <LightModeIcon cursor="pointer" onClick={toggleTheme} />
      )}
    </>
  );
});
