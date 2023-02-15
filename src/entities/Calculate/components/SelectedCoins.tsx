import { Delete } from '@mui/icons-material';
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useCallback } from 'react';
import { Control, Controller } from 'react-hook-form';
import { ISelectedInvestCoin, ISelectedInvestCoinsForm } from '../types';

const useStyles = makeStyles({
  formContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '8px 0',
  },
  title: { textAlign: 'center' },
  boxButton: {
    textAlign: 'center',
    margin: '20px 0',
  },
  flexContainer: { display: 'flex' },
  nameText: { paddingRight: 5 },
  input: { width: 100 },
  deleteButton: {
    alignSelf: 'center',
    width: 28,
    height: 28,

    '&:hover': {
      color: 'red',
    },
  },
});

interface ISelectedCoinsProps {
  addedCoins: ISelectedInvestCoin[];
  control: Control<ISelectedInvestCoinsForm, any>;
  getIndexError: (index: number) => boolean;
  removeAddedCoin: (index: number) => void;
  distributeEqually: () => void;
}

export const SelectedCoins: React.FC<ISelectedCoinsProps> = ({
  addedCoins,
  control,
  getIndexError,
  removeAddedCoin,
  distributeEqually,
}) => {
  const styles = useStyles();

  const renderItem = useCallback(
    ({ primaryId, name, ticker, percent }: ISelectedInvestCoin, index: number) => (
      <Box key={primaryId}>
        <Box className={styles.formContainer}>
          <Box className={styles.flexContainer}>
            <Typography className={styles.nameText}>{name}</Typography>
            <Typography color="GrayText">{ticker}</Typography>
          </Box>

          <Box className={styles.flexContainer}>
            <Controller
              name={`addedCoins.${index}.percent`}
              defaultValue={percent}
              rules={{ required: true, min: 5, max: 100 }}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  autoComplete="off"
                  type="number"
                  error={getIndexError(index)}
                  variant="standard"
                  size="small"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">%</InputAdornment>,
                  }}
                  inputProps={{ min: 5, max: 100 }}
                  className={styles.input}
                  sx={{ mr: 2 }}
                />
              )}
            />

            <IconButton
              onClick={() => removeAddedCoin(index)}
              className={['delete-added-coin', styles.deleteButton].join(' ')}
              title="Remove coin"
            >
              <Delete fontSize="inherit" />
            </IconButton>
          </Box>
        </Box>

        <Divider />
      </Box>
    ),
    [control, getIndexError, removeAddedCoin]
  );

  return (
    <>
      <Typography variant="h6" className={styles.title} style={{ marginBottom: 10 }}>
        Your added coins for investment
      </Typography>

      <Typography>
        Specify the investment percentage for each selected coin (at least 5 percent per coin)
      </Typography>

      <Box className={styles.boxButton}>
        <Button
          type="submit"
          variant="outlined"
          style={{ textTransform: 'none' }}
          onClick={distributeEqually}
          disabled={addedCoins.length === 0}
        >
          Distribute equally
        </Button>
      </Box>

      {addedCoins.map(renderItem)}
    </>
  );
};
