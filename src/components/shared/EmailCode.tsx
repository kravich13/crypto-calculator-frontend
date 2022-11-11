import { Box, Button, Grid } from '@mui/material';
import React, { useCallback } from 'react';
import { Controller, SubmitHandler, useForm, useFormState } from 'react-hook-form';
import { emailCodeValidation } from '../../validation/validation';
import { TextInput } from './TextInput';

interface IEmailCodeProps {
  onConfirm: SubmitHandler<IEmailCodeForm>;
  buttonTitle: string;
}

export interface IEmailCodeForm {
  code: string;
}

export const EmailCode: React.FC<IEmailCodeProps> = React.memo(({ buttonTitle, onConfirm }) => {
  const { handleSubmit, control, resetField } = useForm<IEmailCodeForm>({
    mode: 'onBlur',
  });
  const { errors, isValid } = useFormState({ control });

  const onClear = useCallback(() => {
    resetField('code');
  }, [resetField]);

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(onConfirm)}
      sx={{ mt: 3, width: '100%' }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Controller
            defaultValue=""
            name="code"
            control={control}
            rules={emailCodeValidation}
            render={({ field }) => (
              <TextInput
                {...field}
                required
                fullWidth
                type={'number'}
                label="Email code"
                autoComplete="Code"
                error={!!errors.code}
                helperText={errors.code?.message}
                onClearValue={onClear}
              />
            )}
          />
        </Grid>
      </Grid>

      <Button
        sx={{ mt: 3, mb: 2, textTransform: 'none' }}
        type="submit"
        fullWidth
        variant="contained"
        disabled={!isValid}
      >
        {buttonTitle}
      </Button>
    </Box>
  );
});
