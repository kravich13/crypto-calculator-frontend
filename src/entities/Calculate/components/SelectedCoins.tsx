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
import React, { useCallback } from 'react';
import { Control, Controller } from 'react-hook-form';
import styles from '../styles/SelectedCoins.module.css';
import { ISelectedInvestCoin, ISelectedInvestCoinsForm } from '../types';
import { MainCoinInfoContainer } from './MainCoinInfoContainer';

interface ISelectedCoinsProps {
  isLoading: boolean;
  maxNumberOfCoinsToInvest: number;
  addedCoins: ISelectedInvestCoin[];
  control: Control<ISelectedInvestCoinsForm, any>;
  getIndexError: (index: number) => boolean;
  removeAddedCoin: (index: number) => void;
  distributeEqually: () => void;
  onEnterSelectedCoins: () => void;
}

export const SelectedCoins: React.FC<ISelectedCoinsProps> = ({
  isLoading,
  maxNumberOfCoinsToInvest,
  addedCoins,
  control,
  getIndexError,
  removeAddedCoin,
  distributeEqually,
  onEnterSelectedCoins,
}) => {
  const minPercentTitle = 100 / maxNumberOfCoinsToInvest;

  const onKeyPress = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.code === 'Enter') {
        onEnterSelectedCoins();
      }
    },
    [onEnterSelectedCoins]
  );

  const renderItem = useCallback(
    ({ coinId, name, symbol, image, percent }: ISelectedInvestCoin, index: number) => (
      <Box key={`${coinId}-${index}`}>
        <Box className={styles.formContainer}>
          <MainCoinInfoContainer image={image} name={name} symbol={symbol} />

          <Box className={styles.flexContainer}>
            <Controller
              name={`addedCoins.${index}.percent`}
              defaultValue={percent}
              rules={{ required: true, min: 10, max: 100 }}
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
                  inputProps={{ min: 10, max: 100 }}
                  className={styles.input}
                  sx={{ mr: 2 }}
                  disabled={isLoading}
                  onKeyDown={onKeyPress}
                />
              )}
            />

            <IconButton
              disabled={isLoading}
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
    [control, isLoading, getIndexError, onKeyPress, removeAddedCoin]
  );

  return (
    <>
      <Typography variant="h6" className={styles.title} style={{ marginBottom: 10 }}>
        Your added coins for investment
      </Typography>

      <Typography className={styles.selectedMaxCoins}>
        Сan select a maximum of {maxNumberOfCoinsToInvest} coins
      </Typography>

      <Typography className={styles.selectedCoins}>Selected coins: {addedCoins.length}</Typography>

      <Typography>
        Specify the investment percentage for each selected coin (at least
        {` ${minPercentTitle} `}
        percent per coin)
      </Typography>

      <Box className={styles.boxButton}>
        <Button
          variant="outlined"
          style={{ textTransform: 'none' }}
          onClick={distributeEqually}
          disabled={addedCoins.length === 0 || isLoading}
        >
          Distribute equally
        </Button>
      </Box>

      {addedCoins.map(renderItem)}
    </>
  );
};
