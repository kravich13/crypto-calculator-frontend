import { Box, Button, Grid } from '@mui/material';
import React, { useCallback } from 'react';
import { useForm, useFormState } from 'react-hook-form';
import { mounthlyValidation } from '../../validation';
import { DateControlller, NumberController } from '../shared/controllers';

interface IPeriodAndAmountForm {
  startDate: string;
  endDate: string;
  monthlyInvestment: number;
}

export const PeriodAndAmount: React.FC = React.memo(() => {
  const { handleSubmit, control } = useForm<IPeriodAndAmountForm>({ mode: 'onBlur' });
  const { errors, isValid } = useFormState({ control });

  const onClickNext = useCallback(() => {}, []);

  const onSubmit = useCallback((event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    handleSubmit((data) => {})();
  }, []);

  return (
    <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <DateControlller
            name="startDate"
            label="Start date"
            control={control}
            error={errors.startDate}
          />
        </Grid>

        <Grid item xs={12}>
          <DateControlller
            name="endDate"
            label="End date"
            control={control}
            error={errors.endDate}
          />
        </Grid>

        <Grid item xs={12}>
          <NumberController
            name="monthlyInvestment"
            label="Monthly investment"
            control={control}
            error={errors.monthlyInvestment}
            rules={mounthlyValidation}
          />
        </Grid>
      </Grid>

      <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          sx={{ mt: 3, mb: 2, textTransform: 'none' }}
          type="submit"
          fullWidth
          variant="contained"
          disabled={!isValid}
          onClick={onClickNext}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
});
