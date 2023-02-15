import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';

export const useNavButtonsStyles = makeStyles({
  container: {
    padding: '0 11px',
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerNavigate: {
    display: 'flex',
    flexDirection: 'row',
  },
  button: {
    background: '#e0e0e0',
    padding: '0 8px',
    textAlign: 'center',
    verticalAlign: 'center',
    borderRadius: 4,
    fontWeight: 600,
  },
  firstButton: { marginRight: 5 },
  text: { paddingLeft: 5 },
});

export const SearchNavigationButtons: React.FC = React.memo(() => {
  const styles = useNavButtonsStyles();

  const buttonsProps = { fontSize: 'small', color: '#1565c0' };

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
