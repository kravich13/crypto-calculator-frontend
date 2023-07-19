import { Delete } from '@mui/icons-material';
import { Box, Button, Divider, IconButton, InputAdornment, TextField } from '@mui/material';
import React, { useCallback } from 'react';
import { Control, Controller } from 'react-hook-form';
import styles from '../styles/SelectedCoins.module.scss';
import { ISelectedInvestCoin, ISelectedInvestCoinsForm } from '../types';
import { MainCoinInfoContainer } from './MainCoinInfoContainer';
import { useTranslation } from 'next-i18next';
import { Typography } from '@cc/shared/ui';

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
  const { t } = useTranslation();
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
              title={t('cc.entity.selectedCoins.iconButtonTitle')}
            >
              <Delete fontSize="inherit" />
            </IconButton>
          </Box>
        </Box>

        <Divider />
      </Box>
    ),
    [control, isLoading, t, getIndexError, onKeyPress, removeAddedCoin]
  );

  return (
    <>
      <Typography tint variant="h6" className={styles.title} style={{ marginBottom: 10 }}>
        {t('cc.entity.selectedCoins.title')}
      </Typography>

      <Typography className={styles.selectedMaxCoins}>
        {t('cc.entity.selectedCoins.maxCoins', { count: maxNumberOfCoinsToInvest })}
      </Typography>

      <Typography className={styles.selectedCoins} color="darkgoldenrod">
        {t('cc.entity.selectedCoins.selectedCoins', { count: addedCoins.length })}
      </Typography>

      <Typography>{t('cc.entity.selectedCoins.percentage', { count: minPercentTitle })}</Typography>

      <Box className={styles.boxButton}>
        <Button
          variant="outlined"
          style={{ textTransform: 'none' }}
          onClick={distributeEqually}
          disabled={addedCoins.length === 0 || isLoading}
        >
          {t('cc.entity.selectedCoins.distributeButton')}
        </Button>
      </Box>

      {addedCoins.map(renderItem)}
    </>
  );
};
