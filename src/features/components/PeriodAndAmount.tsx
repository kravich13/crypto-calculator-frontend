import {
  INPUT_FORMAT_DATE,
  MIN_INVEST_DATE,
  mounthlyValidation,
  startDateValidation,
} from '@cc/entities/Calculate';
import { IPeriodAndAmountForm } from '@cc/shared/types';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { LoadingButton } from '@mui/lab';
import { Box, Grid, InputAdornment, TextField } from '@mui/material';
import { DateTime } from 'luxon';
import React, { useCallback, useMemo } from 'react';
import { Controller, SubmitHandler, useForm, useFormState } from 'react-hook-form';

interface IPeriodAndAmountProps {
  isLoading: boolean;
  onConfirm: SubmitHandler<IPeriodAndAmountForm>;
}

export const PeriodAndAmount: React.FC<IPeriodAndAmountProps> = React.memo(
  ({ isLoading, onConfirm }) => {
    const { control, formState, watch, getFieldState, handleSubmit } =
      useForm<IPeriodAndAmountForm>({
        mode: 'onBlur',
      });
    const { errors, isValid } = useFormState({ control });

    const startState = getFieldState('startDate', formState);
    const startValue = watch('startDate');
    const startDateIsValid = Boolean(!startState.invalid && startState.isTouched);

    const todayDate = useMemo(() => DateTime.now(), []);
    const yesterdayString = todayDate.minus({ day: 1 }).toFormat(INPUT_FORMAT_DATE);
    const todayString = todayDate.toFormat(INPUT_FORMAT_DATE);

    const endDateValidate = useCallback(
      (value: string) => {
        const inputDate = DateTime.fromFormat(value, INPUT_FORMAT_DATE);
        const minDate = DateTime.fromFormat(startValue, INPUT_FORMAT_DATE);

        const equalOrGreaterToday = inputDate.toMillis() >= minDate.toMillis();
        const equalOrLessToday = inputDate.toMillis() <= todayDate.toMillis();

        const isValidDate = equalOrGreaterToday && equalOrLessToday;

        let validateText = '';

        if (!equalOrGreaterToday) {
          validateText = 'End date must be greater than or equal to start date.';
        } else if (!equalOrLessToday) {
          validateText = 'End date must be less than or equal to today date.';
        }

        return isValidDate || validateText;
      },
      [startValue, todayDate]
    );

    return (
      <Box component="form" noValidate onSubmit={handleSubmit(onConfirm)} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Controller
              defaultValue=""
              name="monthlyInvestment"
              control={control}
              rules={mounthlyValidation}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  type="number"
                  label="Monthly investment"
                  error={Boolean(errors.monthlyInvestment)}
                  helperText={errors.monthlyInvestment?.message}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                  inputProps={{ min: 20, max: 1000000 }}
                  disabled={isLoading}
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              defaultValue=""
              name="startDate"
              control={control}
              rules={startDateValidation}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="date"
                  fullWidth
                  label="Start date (mm/dd/yyyy)"
                  error={Boolean(errors.startDate)}
                  helperText={errors?.startDate?.message}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ min: MIN_INVEST_DATE, max: yesterdayString }}
                  disabled={isLoading}
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              defaultValue=""
              name="endDate"
              control={control}
              rules={{ required: true, validate: endDateValidate }}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="date"
                  fullWidth
                  label="End date (mm/dd/yyyy)"
                  error={Boolean(errors.endDate)}
                  helperText={errors?.endDate?.message}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ min: startValue || MIN_INVEST_DATE, max: todayString }}
                  disabled={!startDateIsValid || isLoading}
                />
              )}
            />
          </Grid>
        </Grid>

        <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
          <LoadingButton
            sx={{ mt: 3, textTransform: 'none' }}
            type="submit"
            fullWidth
            variant="contained"
            disabled={!isValid}
            loading={isLoading}
            loadingPosition="end"
            endIcon={<ArrowForwardIcon />}
          >
            Next
          </LoadingButton>
        </Box>
      </Box>
    );
  }
);
