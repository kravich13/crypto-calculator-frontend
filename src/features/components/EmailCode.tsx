import { emailCodeValidation } from '@cc/entities/Authorization';
import { TextInput } from '@cc/shared/ui';
import LoginIcon from '@mui/icons-material/Login';
import SendIcon from '@mui/icons-material/Send';
import { LoadingButton } from '@mui/lab';
import { Box, Grid } from '@mui/material';
import React, { useCallback } from 'react';
import { Controller, SubmitHandler, useForm, useFormState } from 'react-hook-form';

interface IEmailCodeProps {
  isLoading: boolean;
  onConfirm: SubmitHandler<IEmailCodeForm>;
}

interface IEmailCodeForm {
  code: string;
}

export const EmailCode: React.FC<IEmailCodeProps> = React.memo(({ isLoading, onConfirm }) => {
  const { handleSubmit, control, resetField } = useForm<IEmailCodeForm>({ mode: 'onBlur' });
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
                type="number"
                label="Email code"
                autoComplete="Code"
                error={Boolean(errors.code)}
                helperText={errors.code?.message}
                onClearValue={onClear}
                disabled={isLoading}
              />
            )}
          />
        </Grid>
      </Grid>

      <LoadingButton
        sx={{ mt: 3, textTransform: 'none' }}
        type="submit"
        fullWidth
        variant="contained"
        disabled={!isValid || isLoading}
        loading={isLoading}
        loadingPosition="end"
        endIcon={<LoginIcon />}
      >
        Send
      </LoadingButton>
    </Box>
  );
});
