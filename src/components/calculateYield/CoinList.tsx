import { Box, Button, Grid } from '@mui/material';
import React, { useCallback } from 'react';
import { useForm, useFormState } from 'react-hook-form';
import { v4 as uuid } from 'uuid';
import { SearchInput } from './SearchInput';

interface IConinListForm {
  selectedCoin: string;
}

export interface IMockData {
  id: string;
  name: string;
  ticker: string;
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
  const { control, handleSubmit } = useForm<IConinListForm>({ mode: 'onBlur' });
  const { errors, isValid } = useFormState({ control });

  const onSubmit = useCallback((event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
  }, []);

  const onClickSelectedItem = useCallback((id: string) => {
    console.log(id);
  }, []);

  return (
    <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <SearchInput searchData={mockData} label="Search by name or ticker" />
        </Grid>
      </Grid>

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
          disabled={!isValid}
        >
          Calculate
        </Button>
      </Box>
    </Box>
  );
});
