import { useThemeContext } from '@cc/shared/lib';
import variables from '@cc/shared/styles/Variables.module.scss';
import { Box, Typography, useTheme } from '@mui/material';
import React from 'react';
import styles from '../styles/SearchNavigationButtons.module.scss';

export const SearchNavigationButtons: React.FC = React.memo(() => {
  const { themeMode } = useThemeContext();
  const { palette } = useTheme();

  const buttonsProps = {
    fontSize: 'small',
    color: themeMode === 'light' ? variables.primaryLight : variables.primaryDark,
  };

  return (
    <Box component="div" className={styles.container}>
      <Box component="div" className={styles.containerNavigate}>
        <Box {...buttonsProps} className={styles.button}>
          ↑
        </Box>

        <Box {...buttonsProps} className={styles.button}>
          ↓
        </Box>

        <Typography fontSize="small" style={{ color: palette.text.secondary }}>
          Navigate
        </Typography>
      </Box>

      <Box component="div" className={styles.containerNavigate}>
        <Box {...buttonsProps} className={styles.button}>
          ESC
        </Box>

        <Typography fontSize="small" style={{ color: palette.text.secondary }}>
          Cancel
        </Typography>
      </Box>

      <Box component="div" className={styles.containerNavigate}>
        <Box {...buttonsProps} className={styles.button}>
          ↵
        </Box>

        <Typography fontSize="small" style={{ color: palette.text.secondary }}>
          Enter
        </Typography>
      </Box>
    </Box>
  );
});
