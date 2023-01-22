import { Box, Button } from '@mui/material';
import React, { useCallback, useMemo } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { v4 as uuid } from 'uuid';
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
  percent: number;
  primaryId: string;
}

export interface IFormState {
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

export const CoinList: React.FC = React.memo(() => {
  const { control, handleSubmit } = useForm<IFormState>({ mode: 'onBlur' });
  const { fields: addedCoins, prepend, remove } = useFieldArray({ control, name: 'addedCoins' });

  const searchData = useMemo(
    () => mockData.filter(({ id }) => !addedCoins.find(({ primaryId }) => primaryId === id)),
    [addedCoins]
  );

  const distributeEqually = useCallback(() => {}, []);

  const onSubmit = useCallback((data: IFormState) => {}, []);

  return (
    <Box>
      <SearchInput
        searchData={searchData}
        label="Search by name or ticker"
        prependSelectedCoin={prepend}
      />

      <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} mt={3}>
        <AddedCoins
          addedCoins={addedCoins}
          control={control}
          removeAddedCoin={remove}
          distributeEqually={distributeEqually}
        />
      </Box>

      <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          sx={{ mt: 3, mb: 2, textTransform: 'none', width: '120px' }}
          type="submit"
          variant="contained"
        >
          Back
        </Button>

        <Button
          sx={{ mt: 3, mb: 2, textTransform: 'none', width: '120px' }}
          type="submit"
          variant="contained"
        >
          Calculate
        </Button>
      </Box>
    </Box>
  );
});
