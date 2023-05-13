import { PRIMARY_COLOR } from '@cc/shared/const';
import { Box, Typography, useTheme } from '@mui/material';
import React from 'react';
import styles from '../styles/SearchNavigationButtons.module.css';

export const SearchNavigationButtons: React.FC = React.memo(() => {
  const { palette } = useTheme();
  const buttonsProps = { fontSize: 'small', color: PRIMARY_COLOR };

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
