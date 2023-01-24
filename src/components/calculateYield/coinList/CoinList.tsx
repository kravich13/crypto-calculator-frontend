import { Box, Button, Typography } from '@mui/material';
import React, { useCallback, useMemo } from 'react';
import { SubmitHandler, useFieldArray, useForm, useFormState } from 'react-hook-form';
import { v4 as uuid } from 'uuid';
import { addedCoinsValidation } from '../../../validation';
import { AddedCoins } from './AddedCoins';
import { SearchInput } from './SearchInput';

export interface IMainMockData {
  name: string;
  ticker: string;
}

export interface IMockData extends IMainMockData {
  id: string;
}

export interface IAddedCoin extends IMainMockData {
  percent: string;
  primaryId: string;
}

export interface ICoinListForm {
  addedCoins: IAddedCoin[];
}

const mockData = [
  { id: uuid(), name: 'Bitcoin', ticker: 'BTC' },
  { id: uuid(), name: 'Litecoin', ticker: 'LTC' },
  { id: uuid(), name: 'Ethereum', ticker: 'ETH' },
  { id: uuid(), name: 'Eos', ticker: 'EOS' },
  { id: uuid(), name: 'Tether', ticker: 'USDT' },
  { id: uuid(), name: 'Ethereum Classic', ticker: 'ETC' },
];

interface ICoinListProps {
  onBack: () => void;
  onConfirm: SubmitHandler<ICoinListForm>;
}

export const CoinList: React.FC<ICoinListProps> = React.memo(({ onBack, onConfirm }) => {
  const { control, handleSubmit, setValue } = useForm<ICoinListForm>({ mode: 'onBlur' });

  const {
    fields: addedCoins,
    prepend,
    remove,
  } = useFieldArray({ control, name: 'addedCoins', rules: addedCoinsValidation });

  const { errors, isValid } = useFormState({ control, name: 'addedCoins' });

  const errorTitle = useMemo(() => {
    if (addedCoins.length === 0) {
      return 'Coins not selected';
    } else if (!isValid) {
      return 'The total percentage must be 100';
    }
  }, [addedCoins.length, isValid]);

  const searchData = useMemo(
    () => mockData.filter(({ id }) => !addedCoins.find(({ primaryId }) => primaryId === id)),
    [addedCoins]
  );

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
        label="Search by name or ticker"
        prependSelectedCoin={prepend}
      />

      <Box component="form" noValidate onSubmit={onSubmit} mt={3}>
        <AddedCoins
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
          disabled={!isValid}
          onClick={onCalculate}
        >
          Calculate
        </Button>
      </Box>
    </Box>
  );
});
