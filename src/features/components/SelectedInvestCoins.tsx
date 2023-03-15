import {
  addedCoinsValidation,
  ISelectedInvestCoinsForm,
  SearchInput,
  SelectedCoins,
} from '@cc/entities/Calculate';
import { useLazyCoinSearchQuery } from '@cc/shared/api';
import { useAppSelector, useCheckValidToken, useErrorMessage } from '@cc/shared/lib';
import CalculateIcon from '@mui/icons-material/Calculate';
import WestIcon from '@mui/icons-material/West';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Typography } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { SubmitHandler, useFieldArray, useForm, useFormState } from 'react-hook-form';
import styles from '../styles/SelectedInvestCoins.module.css';

interface ISelectedInvestCoinsProps {
  isLoading: boolean;
  onBack: () => void;
  onConfirm: SubmitHandler<ISelectedInvestCoinsForm>;
}

const LIMIT_FOR_SEARCH_REQUEST = 6;

export const SelectedInvestCoins: React.FC<ISelectedInvestCoinsProps> = React.memo(
  ({ isLoading, onBack, onConfirm }) => {
    const currentSearchText = useRef('');

    const startDate = useAppSelector((state) => state.baseCalculatorReducer.startDate);

    const [coinSearchRequest, { data: searchCoins, error }] = useLazyCoinSearchQuery();

    const errorMessage = useErrorMessage(error);
    useCheckValidToken(errorMessage, () => {
      coinSearchRequest({ limit: LIMIT_FOR_SEARCH_REQUEST, searchText: currentSearchText.current });
    });

    const maxNumberOfCoinsToInvest = useAppSelector(
      (state) => state.baseCalculatorReducer.maxNumberOfCoinsToInvest
    );

    const { control, handleSubmit, setValue } = useForm<ISelectedInvestCoinsForm>({
      mode: 'onBlur',
    });

    const {
      fields: addedCoins,
      prepend,
      remove,
    } = useFieldArray({ control, name: 'addedCoins', rules: addedCoinsValidation });

    const { errors, isValid } = useFormState({ control, name: 'addedCoins' });

    const canAddCoin = addedCoins.length < maxNumberOfCoinsToInvest;

    const errorTitle = useMemo(() => {
      if (addedCoins.length === 0) {
        return 'Coins not selected';
      } else if (!isValid) {
        return 'The total percentage must be 100';
      }
    }, [addedCoins.length, isValid]);

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
      currentSearchText.current = searchText;
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

    const onSubmit = useCallback((event: React.ChangeEvent<HTMLFormElement>) => {
      event.preventDefault();
    }, []);

    return (
      <Box>
        <Typography className={styles.coinsUntilDate}>
          Coins until {startDate} are available for search.
        </Typography>

        <SearchInput
          isLoading={isLoading}
          searchData={searchData}
          label="Search by name"
          canAddCoin={canAddCoin}
          prependSelectedCoin={prepend}
          makeSearchRequest={makeSearchRequest}
        />

        <Box component="form" noValidate onSubmit={onSubmit} mt={3}>
          <SelectedCoins
            isLoading={isLoading}
            maxNumberOfCoinsToInvest={maxNumberOfCoinsToInvest}
            addedCoins={addedCoins}
            control={control}
            getIndexError={getIndexError}
            removeAddedCoin={remove}
            distributeEqually={distributeEqually}
          />
        </Box>

        <Typography
          sx={{ mt: 2, mb: 2 }}
          textAlign="center"
          variant="subtitle1"
          color="red"
          fontStyle="oblique"
        >
          {errorTitle}
        </Typography>

        <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            sx={{ textTransform: 'none', width: '120px' }}
            type="submit"
            variant="contained"
            startIcon={<WestIcon />}
            title="dsds"
            onClick={onBack}
          >
            Back
          </Button>

          <LoadingButton
            sx={{ textTransform: 'none', width: '120px' }}
            type="submit"
            variant="contained"
            disabled={!isValid || addedCoins.length > maxNumberOfCoinsToInvest}
            loading={isLoading}
            loadingPosition="end"
            endIcon={<CalculateIcon />}
            onClick={onCalculate}
          >
            Calculate
          </LoadingButton>
        </Box>
      </Box>
    );
  }
);
