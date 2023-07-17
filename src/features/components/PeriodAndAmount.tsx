import {
  INPUT_FORMAT_DATE,
  MIN_INVEST_DATE,
  endDateValidation,
  mounthlyValidation,
  startDateValidation,
} from '@cc/entities/Calculate';
import { IPeriodAndAmountForm } from '@cc/shared/types';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { LoadingButton } from '@mui/lab';
import { Box, Grid, InputAdornment, TextField, Typography } from '@mui/material';
import { DateTime } from 'luxon';
import { useTranslation } from 'next-i18next';
import React, { useCallback, useMemo } from 'react';
import { Controller, SubmitHandler, UseFormReturn, useFormState } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateField, DateValidationError, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';

interface IPeriodAndAmountProps {
  isLoading: boolean;
  state: UseFormReturn<IPeriodAndAmountForm, any>;
  onConfirm: SubmitHandler<IPeriodAndAmountForm>;
}

export const PeriodAndAmount: React.FC<IPeriodAndAmountProps> = React.memo(
  ({ isLoading, state, onConfirm }) => {
    const { control, formState, watch, getFieldState, handleSubmit, setError, clearErrors } = state;
    const { errors, isValid } = useFormState({ control });
    const {
      t,
      i18n: { language },
    } = useTranslation();

    const adapterLocale = language === 'ua' ? 'uk-ua' : 'en-us';

    const startState = getFieldState('startDate', formState);
    const startValue: number | undefined = watch('startDate');

    const startDateIsValid = Boolean(!startState.invalid && startState.isTouched);

    const todayDate = useMemo(() => DateTime.now(), []);
    const startDate = useMemo(
      () => DateTime.fromMillis(startValue || MIN_INVEST_DATE),
      [startValue]
    );

    const yesterdayTS = todayDate.minus({ day: 1 }).toMillis();
    const todayString = todayDate.toFormat(INPUT_FORMAT_DATE);

    const nextDayOfStartDateString = startDate.plus({ day: 1 }).toFormat(INPUT_FORMAT_DATE);

    const onDateError = useCallback(
      (
        error: DateValidationError | null,
        name: Exclude<keyof IPeriodAndAmountForm, 'monthlyInvestment'>
      ) => {
        if (error) {
          setError(
            name,
            { message: t('cc.feature.periodAndAmount.startDateInput.errorMessage') },
            { shouldFocus: true }
          );
        } else {
          clearErrors('startDate');
        }
      },
      [t]
    );

    return (
      <Box component="form" noValidate onSubmit={handleSubmit(onConfirm)} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Controller
              defaultValue=""
              name="monthlyInvestment"
              control={control}
              rules={mounthlyValidation(t)}
              render={({ field }) => (
                <TextField
                  {...field}
                  required
                  fullWidth
                  type="number"
                  label={t('cc.feature.periodAndAmount.monthlyInput.label')}
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
              defaultValue={DateTime.fromMillis(MIN_INVEST_DATE).toMillis()}
              name="startDate"
              control={control}
              rules={startDateValidation(t)}
              render={({ field: { name, value, ref, onChange } }) => (
                <DatePicker
                  inputRef={ref}
                  label={t('cc.feature.periodAndAmount.startDateInput.label')}
                  value={DateTime.fromMillis(value)}
                  minDate={DateTime.fromMillis(MIN_INVEST_DATE)}
                  maxDate={DateTime.fromMillis(yesterdayTS)}
                  onChange={(data) => onChange(data?.toMillis() || MIN_INVEST_DATE)}
                  onError={(error) => onDateError(error, name)}
                  slotProps={{
                    textField: {
                      InputLabelProps: { shrink: true },
                      fullWidth: true,
                      required: true,
                      helperText: errors?.startDate?.message,
                    },
                  }}
                  disabled={isLoading}
                />
              )}
            />
          </Grid>

          {/* <Grid item xs={12}>
            <Controller
              defaultValue=""
              name="endDate"
              control={control}
              rules={endDateValidation(startDate, todayDate, t)}
              render={({ field }) => (
                <TextField
                  {...field}
                  required
                  type="date"
                  fullWidth
                  label={t('cc.feature.periodAndAmount.endDateInput.label')}
                  error={Boolean(errors.endDate)}
                  helperText={errors?.endDate?.message}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ min: nextDayOfStartDateString, max: todayString }}
                  disabled={!startDateIsValid || isLoading}
                />
              )}
            />
          </Grid> */}
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
            <Typography noWrap>{t('cc.feature.periodAndAmount.nextButton')}</Typography>
          </LoadingButton>
        </Box>
      </Box>
    );
  }
);
