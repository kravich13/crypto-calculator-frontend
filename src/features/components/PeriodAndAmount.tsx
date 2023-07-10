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
import React, { useMemo } from 'react';
import { Controller, SubmitHandler, UseFormReturn, useFormState } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface IPeriodAndAmountProps {
  isLoading: boolean;
  state: UseFormReturn<IPeriodAndAmountForm, any>;
  onConfirm: SubmitHandler<IPeriodAndAmountForm>;
}

export const PeriodAndAmount: React.FC<IPeriodAndAmountProps> = React.memo(
  ({ isLoading, state, onConfirm }) => {
    const { control, formState, watch, getFieldState, handleSubmit } = state;
    const { errors, isValid } = useFormState({ control });
    const { t } = useTranslation();

    const startState = getFieldState('startDate', formState);
    const startValue = watch('startDate');

    const startDateIsValid = Boolean(!startState.invalid && startState.isTouched);

    const todayDate = useMemo(() => DateTime.now(), []);
    const startDate = useMemo(
      () =>
        DateTime.fromFormat(Boolean(startValue) ? startValue : MIN_INVEST_DATE, INPUT_FORMAT_DATE),
      [startValue]
    );

    const yesterdayString = todayDate.minus({ day: 1 }).toFormat(INPUT_FORMAT_DATE);
    const todayString = todayDate.toFormat(INPUT_FORMAT_DATE);
    const nextDayOfStartDateString = startDate.plus({ day: 1 }).toFormat(INPUT_FORMAT_DATE);

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

              <DatePicker
                  // value={datePickerValue}
                  // label={t('cc.feature.periodAndAmount.startDateInput.label')}
                  // onChange={(newValue) => setDatePickerValue(newValue)}
                  // renderInput={(params) => <TextField {...params} />}
              />

            {/*<Controller*/}
            {/*  defaultValue=""*/}
            {/*  name="startDate"*/}
            {/*  control={control}*/}
            {/*  rules={startDateValidation(t)}*/}
            {/*  render={({ field }) => (*/}

            {/*      // <TextField*/}
            {/*      //   {...field}*/}
            {/*      //   required*/}
            {/*      //   type="date"*/}
            {/*      //   fullWidth*/}
            {/*      //   label={t('cc.feature.periodAndAmount.startDateInput.label')}*/}
            {/*      //   error={Boolean(errors.startDate)}*/}
            {/*      //   helperText={errors?.startDate?.message}*/}
            {/*      //   InputLabelProps={{ shrink: true }}*/}
            {/*      //   inputProps={{ min: MIN_INVEST_DATE, max: yesterdayString }}*/}
            {/*      //   disabled={isLoading}*/}
            {/*      // />*/}
            {/*  )}*/}
            {/*/>*/}
          </Grid>

          <Grid item xs={12}>
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
            <Typography noWrap>{t('cc.feature.periodAndAmount.nextButton')}</Typography>
          </LoadingButton>
        </Box>
      </Box>
    );
  }
);
