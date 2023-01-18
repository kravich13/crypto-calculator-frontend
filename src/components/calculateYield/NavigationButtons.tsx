import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';

const useStyles = makeStyles({
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
  text: {
    paddingLeft: 5,
  },
});

export const NavigationButtons: React.FC = () => {
  const styles = useStyles();

  return (
    <Box component="div" className={styles.container}>
      <Box component="div" className={styles.containerNavigate}>
        <Box fontSize="small" color="blue" className={styles.button}>
          ↑
        </Box>
        <Box fontSize="small" color="blue" className={styles.button}>
          ↓
        </Box>
        <Typography fontSize="small" color="GrayText" className={styles.text}>
          Navigate
        </Typography>
      </Box>

      <Box component="div" className={styles.containerNavigate}>
        <Box fontSize="small" color="blue" className={styles.button}>
          ESC
        </Box>
        <Typography fontSize="small" color="GrayText" className={styles.text}>
          Cancel
        </Typography>
      </Box>

      <Box component="div" className={styles.containerNavigate}>
        <Box fontSize="small" color="blue" className={styles.button}>
          ↵
        </Box>
        <Typography fontSize="small" color="GrayText" className={styles.text}>
          Enter
        </Typography>
      </Box>
    </Box>
  );
};
