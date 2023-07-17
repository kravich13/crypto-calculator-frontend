import { INPUT_FORMAT_DATE, MIN_INVEST_TS, mounthlyValidation } from '@cc/entities/Calculate';
import { IPeriodAndAmountForm } from '@cc/shared/types';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { LoadingButton } from '@mui/lab';
import { Box, Grid, InputAdornment, TextField, Typography } from '@mui/material';
import { DateValidationError } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTime } from 'luxon';
import { useTranslation } from 'next-i18next';
import React, { useCallback, useMemo } from 'react';
import {
  Controller,
  ControllerRenderProps,
  SubmitHandler,
  UseFormReturn,
  useFormState,
} from 'react-hook-form';

type DateKeysType = Exclude<keyof IPeriodAndAmountForm, 'monthlyInvestment'>;

interface IRenderDatePicker<T extends DateKeysType> {
  field: ControllerRenderProps<IPeriodAndAmountForm, T>;
  minDate: DateTime;
  maxDate: DateTime;
  helperText?: string;
}

interface IPeriodAndAmountProps {
  isLoading: boolean;
  state: UseFormReturn<IPeriodAndAmountForm, any>;
  onConfirm: SubmitHandler<IPeriodAndAmountForm>;
}

export const PeriodAndAmount: React.FC<IPeriodAndAmountProps> = React.memo(
  ({ isLoading, state, onConfirm }) => {
    const { control, formState, watch, handleSubmit, setError, clearErrors } = state;
    const { errors, isValid } = useFormState({ control });
    const { t } = useTranslation();

    const startValue: number | undefined = watch('startDate');
    const todayDate = DateTime.now();
    const startDate = DateTime.fromMillis(startValue || MIN_INVEST_TS);
    const yesterdayTS = todayDate.minus({ day: 1 }).toMillis();
    const nextDayOfStartDate = startDate.plus({ day: 1 });
    const disabledNextButton = Boolean(
      !isValid || formState.errors.startDate || formState.errors.endDate
    );

    const onDateError = useCallback(
      (error: DateValidationError | null, name: DateKeysType) => {
        if (error) {
          setError(name, { message: t(`cc.feature.periodAndAmount.${name}Input.errorMessage`) });
        } else {
          clearErrors(name);
        }
      },
      [t]
    );

    const renderDatePicker = useCallback(
      <T extends DateKeysType>({
        field: { name, value, ref, onChange },
        minDate,
        maxDate,
        helperText,
      }: IRenderDatePicker<T>) => (
        <DatePicker
          inputRef={ref}
          label={t(`cc.feature.periodAndAmount.${name}Input.label`)}
          value={DateTime.fromMillis(value)}
          minDate={minDate}
          maxDate={maxDate}
          onChange={(data) => {
            const defaultTS = name === 'startDate' ? MIN_INVEST_TS : DateTime.now().toMillis();

            // onChange(data?.toMillis() || defaultTS);
          }}
          onError={(error) => onDateError(error, name)}
          slotProps={{
            textField: {
              InputLabelProps: { shrink: true },
              fullWidth: true,
              required: true,
              helperText,
            },
          }}
          disabled={isLoading}
        />
      ),
      [isLoading, onDateError, t]
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
              defaultValue={DateTime.fromMillis(MIN_INVEST_TS).toMillis()}
              name="startDate"
              control={control}
              rules={{ required: true }}
              render={({ field }) =>
                renderDatePicker<'startDate'>({
                  field,
                  helperText: errors?.startDate?.message,
                  minDate: DateTime.fromMillis(MIN_INVEST_TS),
                  maxDate: DateTime.fromMillis(yesterdayTS),
                })
              }
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              defaultValue={DateTime.now().toMillis()}
              name="endDate"
              control={control}
              render={({ field }) =>
                renderDatePicker<'endDate'>({
                  field,
                  helperText: errors?.endDate?.message,
                  minDate: nextDayOfStartDate,
                  maxDate: DateTime.now(),
                })
              }
            />
          </Grid>
        </Grid>

        <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
          <LoadingButton
            sx={{ mt: 3, textTransform: 'none' }}
            type="submit"
            fullWidth
            variant="contained"
            disabled={disabledNextButton}
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
