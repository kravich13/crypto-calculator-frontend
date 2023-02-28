import {
  addedCoinsValidation,
  ISelectedInvestCoinsForm,
  SearchInput,
  SelectedCoins,
} from '@cc/entities/Calculate';
import { useLazyCoinSearchQuery } from '@cc/shared/api';
import { useAppSelector } from '@cc/shared/lib';
import { Box, Button, Typography } from '@mui/material';
import React, { useCallback, useEffect, useMemo } from 'react';
import { SubmitHandler, useFieldArray, useForm, useFormState } from 'react-hook-form';

interface ISelectedInvestCoinsProps {
  onBack: () => void;
  onConfirm: SubmitHandler<ISelectedInvestCoinsForm>;
}

const LIMIT_FOR_SEARCH_REQUEST = 6;

export const SelectedInvestCoins: React.FC<ISelectedInvestCoinsProps> = React.memo(
  ({ onBack, onConfirm }) => {
    const [coinSearchRequest, { data: searchCoins }] = useLazyCoinSearchQuery();

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
        <SearchInput
          searchData={searchData}
          label="Search by name"
          canAddCoin={canAddCoin}
          prependSelectedCoin={prepend}
          makeSearchRequest={makeSearchRequest}
        />

        <Box component="form" noValidate onSubmit={onSubmit} mt={3}>
          <SelectedCoins
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
            onClick={onBack}
          >
            Back
          </Button>

          <Button
            sx={{ textTransform: 'none', width: '120px' }}
            type="submit"
            variant="contained"
            onClick={onCalculate}
            disabled={!isValid || canAddCoin}
          >
            Calculate
          </Button>
        </Box>
      </Box>
    );
  }
);
