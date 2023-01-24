import { Box, Button, Grid } from '@mui/material';
import { DateTime } from 'luxon';
import React, { useCallback, useMemo } from 'react';
import { SubmitHandler, useForm, useFormState } from 'react-hook-form';
import { MIN_INVEST_DATE } from '../../../constants';
import { mounthlyValidation, startDateValidation } from '../../../validation';
import { DateControlller, NumberController } from '../../shared/controllers';

export interface IPeriodAndAmountForm {
  startDate: string;
  endDate: string;
  monthlyInvestment: number;
}

interface IPeriodAndAmountProps {
  onConfirm: SubmitHandler<IPeriodAndAmountForm>;
}

export const PeriodAndAmount: React.FC<IPeriodAndAmountProps> = React.memo(({ onConfirm }) => {
  const { control, formState, watch, getFieldState, handleSubmit } = useForm<IPeriodAndAmountForm>({
    mode: 'onBlur',
  });
  const { errors, isValid } = useFormState({ control });

  const startState = getFieldState('startDate', formState);
  const startValue = watch('startDate');
  const startDateIsValid = Boolean(!startState.invalid && startState.isTouched);

  const todayDate = useMemo(() => DateTime.now().toFormat('y-LL-dd'), []);

  const endDateValidate = useCallback(
    (value: string) => {
      const inputDate = DateTime.fromFormat(value, 'y-LL-dd');
      const minDate = DateTime.fromFormat(startValue, 'y-LL-dd');

      const isValidDate = inputDate.toMillis() >= minDate.toMillis();

      return isValidDate || 'End date must be greater than or equal to start date.';
    },
    [startValue]
  );

  const onClickNext = useCallback(() => {
    handleSubmit((data) => {
      onConfirm(data);
    })();
  }, [handleSubmit, onConfirm]);

  const onSubmit = useCallback((event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
  }, []);

  return (
    <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <NumberController
            componentProps={{ min: 1, max: 1000000, startAdornmentSymbol: '$' }}
            controllerProps={{ control, name: 'monthlyInvestment', rules: mounthlyValidation }}
            inputProps={{
              label: 'Monthly investment',
              error: Boolean(errors.monthlyInvestment),
              helperText: errors.monthlyInvestment?.message,
              fullWidth: true,
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <DateControlller
            name="startDate"
            label="Start date (mm/dd/yyyy)"
            control={control}
            error={errors.startDate}
            rules={startDateValidation}
            minDate={MIN_INVEST_DATE}
            maxDate={todayDate}
          />
        </Grid>

        <Grid item xs={12}>
          <DateControlller
            name="endDate"
            label="End date (mm/dd/yyyy)"
            control={control}
            error={errors.endDate}
            rules={{ required: true, validate: endDateValidate }}
            minDate={startValue || MIN_INVEST_DATE}
            maxDate={todayDate}
            disabled={!startDateIsValid}
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
