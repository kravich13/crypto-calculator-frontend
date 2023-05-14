import variables from '@cc/shared/styles/Variables.module.scss';
import { Box, Typography, useTheme } from '@mui/material';
import React from 'react';
import styles from '../styles/SearchNavigationButtons.module.scss';

export const SearchNavigationButtons: React.FC = React.memo(() => {
  const { palette } = useTheme();

  const buttonsProps = {
    fontSize: 'small',
    color: variables.primaryLight,
  };

  return (
    <Box className={styles.container}>
      <Box className={styles.containerNavigate}>
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

      <Box className={styles.containerNavigate}>
        <Box {...buttonsProps} className={styles.button}>
          ESC
        </Box>

        <Typography fontSize="small" style={{ color: palette.text.secondary }}>
          Cancel
        </Typography>
      </Box>

      <Box className={styles.containerNavigate}>
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
