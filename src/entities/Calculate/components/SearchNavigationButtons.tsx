import { PRIMARY_COLOR } from '@cc/shared/const';
import { Box, Typography } from '@mui/material';
import React from 'react';
import styles from '../styles/SearchNavigationButtons.module.css';

export const SearchNavigationButtons: React.FC = React.memo(() => {
  const buttonsProps = { fontSize: 'small', color: PRIMARY_COLOR };

  return (
    <Box component="div" className={styles.container}>
      <Box component="div" className={styles.containerNavigate}>
        <Box {...buttonsProps} className={[styles.button, styles.firstButton].join(' ')}>
          ↑
        </Box>
        <Box {...buttonsProps} className={styles.button}>
          ↓
        </Box>
        <Typography fontSize="small" color="GrayText" className={styles.text}>
          Navigate
        </Typography>
      </Box>

      <Box component="div" className={styles.containerNavigate}>
        <Box {...buttonsProps} className={styles.button}>
          ESC
        </Box>
        <Typography fontSize="small" color="GrayText" className={styles.text}>
          Cancel
        </Typography>
      </Box>

      <Box component="div" className={styles.containerNavigate}>
        <Box {...buttonsProps} className={styles.button}>
          ↵
        </Box>
        <Typography fontSize="small" color="GrayText" className={styles.text}>
          Enter
        </Typography>
      </Box>
    </Box>
  );
});
