import {
  addedCoinsValidation,
  ISelectedInvestCoinsForm,
  SearchInput,
  SelectedCoins,
} from '@cc/entities/Calculate';
import { useLazyCoinSearchQuery } from '@cc/shared/api';
import { useAppSelector, useRefreshRequest } from '@cc/shared/lib';
import CalculateIcon from '@mui/icons-material/Calculate';
import WestIcon from '@mui/icons-material/West';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Typography, useTheme } from '@mui/material';
import React, { useCallback, useEffect, useMemo } from 'react';
import { SubmitHandler, useFieldArray, useForm, useFormState } from 'react-hook-form';
import styles from '../styles/SelectedInvestCoins.module.scss';
import { useTranslation } from 'next-i18next';

interface ISelectedInvestCoinsProps {
  isLoading: boolean;
  onBack: () => void;
  onConfirm: SubmitHandler<ISelectedInvestCoinsForm>;
}

const LIMIT_FOR_SEARCH_REQUEST = 6;

export const SelectedInvestCoins: React.FC<ISelectedInvestCoinsProps> = React.memo(
  ({ isLoading, onBack, onConfirm }) => {
    const startDate = useAppSelector((state) => state.baseCalculatorReducer.startDate);
    const { palette } = useTheme();
    const { t } = useTranslation();

    const [coinSearchRequest, { data: searchCoins, error, originalArgs }] =
      useLazyCoinSearchQuery();

    useRefreshRequest(error, () => {
      coinSearchRequest(originalArgs!);
    });

    const maxNumberOfCoinsToInvest = useAppSelector(
      (state) => state.baseCalculatorReducer.maxNumberOfCoinsToInvest
    );

    const { control, handleSubmit, setValue, watch } = useForm<ISelectedInvestCoinsForm>({
      mode: 'onBlur',
    });

    const {
      fields: addedCoins,
      prepend,
      remove,
    } = useFieldArray({ control, name: 'addedCoins', rules: addedCoinsValidation });

    const { errors, isValid } = useFormState({ control, name: 'addedCoins' });

    const canAddCoin = addedCoins.length < maxNumberOfCoinsToInvest;
    const canCalculate = isValid && addedCoins.length <= maxNumberOfCoinsToInvest;

    const errorTitle = useMemo(() => {
      if (addedCoins.length === 0) {
        return t('cc.feature.selectedInvestCoins.error.firstTitle');
      } else if (!isValid) {
        return t('cc.feature.selectedInvestCoins.error.secondTitle');
      }
    }, [addedCoins.length, isValid, t]);

    const searchData = useMemo(
      () =>
        searchCoins?.length
          ? searchCoins.filter(
              ({ coinId }) => !addedCoins.find(({ coinId: addedCoinId }) => addedCoinId === coinId)
            )
          : [],
      [addedCoins, searchCoins]
    );

    const makeSearchRequest = useCallback((searchText: string) => {
      coinSearchRequest({ limit: LIMIT_FOR_SEARCH_REQUEST, searchText });
    }, []);

    useEffect(() => {
      coinSearchRequest({ limit: LIMIT_FOR_SEARCH_REQUEST, searchText: '' });
    }, []);

    const getIndexError = useCallback(
      (index: number) => Boolean(errors.addedCoins?.length && errors.addedCoins[index]?.percent),
      [errors.addedCoins]
    );

    const distributeEqually = useCallback(() => {
      const equalPercent = (100 / addedCoins.length).toFixed(2);

      for (let i = 0; i < addedCoins.length; i++) {
        setValue(`addedCoins.${i}.percent`, equalPercent, { shouldValidate: true });
      }
    }, [addedCoins.length, setValue]);

    const onCalculate = useCallback(() => {
      handleSubmit((data) => {
        onConfirm(data);
      })();
    }, [handleSubmit, onConfirm]);

    const onEnterSelectedCoins = useCallback(() => {
      if (canCalculate) {
        onCalculate();
      }
    }, [canCalculate, onCalculate]);

    return (
      <Box>
        <Typography className={styles.coinsUntilDate}>
          {t('cc.feature.selectedInvestCoins.title', { startDate: 'dasda' })}
        </Typography>

        <SearchInput
          isLoading={isLoading}
          searchData={searchData}
          label={t('cc.feature.selectedInvestCoins.searchInputLabel')}
          canAddCoin={canAddCoin}
          prependSelectedCoin={prepend}
          makeSearchRequest={makeSearchRequest}
        />

        <Box component="form" noValidate onSubmit={onEnterSelectedCoins} mt={3}>
          <SelectedCoins
            isLoading={isLoading}
            maxNumberOfCoinsToInvest={maxNumberOfCoinsToInvest}
            addedCoins={addedCoins}
            control={control}
            getIndexError={getIndexError}
            removeAddedCoin={remove}
            distributeEqually={distributeEqually}
            onEnterSelectedCoins={onEnterSelectedCoins}
          />
        </Box>

        <Typography
          sx={{ mt: 2, mb: 2, color: palette.error.dark }}
          textAlign="center"
          variant="subtitle1"
          fontStyle="oblique"
        >
          {errorTitle}
        </Typography>

        <Box className={styles.buttonsContainer}>
          <Button
            sx={{ textTransform: 'none', width: '140px' }}
            type="submit"
            variant="contained"
            startIcon={<WestIcon />}
            onClick={onBack}
          >
            <Typography noWrap>{t('cc.feature.selectedInvestCoins.button.back')}</Typography>
          </Button>

          <LoadingButton
            sx={{ textTransform: 'none', width: '160px' }}
            type="submit"
            variant="contained"
            disabled={!canCalculate}
            loading={isLoading}
            loadingPosition="end"
            endIcon={<CalculateIcon />}
            onClick={onCalculate}
          >
            <Typography noWrap>{t('cc.feature.selectedInvestCoins.button.calculate')}</Typography>
          </LoadingButton>
        </Box>
      </Box>
    );
  }
);
