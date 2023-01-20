import { Box, Button, Divider, InputAdornment, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useCallback } from 'react';
import { TextInput } from '../shared/controllers';
import { IMockData } from './CoinList';

const useStyles = makeStyles({
  formContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '8px 0',
  },
  coinContainer: { display: 'flex' },
  nameText: { paddingRight: 5 },
});

interface IAddedCoinsProps {
  addedCoins: IMockData[];
}

export const AddedCoins: React.FC<IAddedCoinsProps> = React.memo(({ addedCoins }) => {
  const styles = useStyles();

  const renderItem = useCallback(
    ({ id, name, ticker }: IMockData) => (
      <React.Fragment key={id}>
        <Box component="div" className={styles.formContainer}>
          <Box component="div" className={styles.coinContainer}>
            <Typography className={styles.nameText}>{name}</Typography>
            <Typography color="GrayText">{ticker}</Typography>
          </Box>

          <TextInput
            variant="standard"
            size="small"
            style={{ width: 60 }}
            InputProps={{ startAdornment: <InputAdornment position="start">%</InputAdornment> }}
          />
        </Box>

        <Divider />
      </React.Fragment>
    ),
    []
  );

  return (
    <Box component="div">
      <Typography variant="h6" style={{ textAlign: 'center', marginBottom: 10 }}>
        Your added coins for investment
      </Typography>

      <Typography style={{ marginBottom: 4 }}>
        Specify the investment percentage for each selected coin
      </Typography>

      <Box style={{ textAlign: 'center', marginBottom: 10 }}>
        <Button style={{ textTransform: 'none' }} type="submit" variant="outlined">
          Distribute equally
        </Button>
      </Box>

      {addedCoins.map(renderItem)}
    </Box>
  );
});
