import { emailValidation } from '@cc/entities/Authorization';
import { RoutesTypes } from '@cc/shared/enums';
import { useAppSelector } from '@cc/shared/lib';
import { TextInput } from '@cc/shared/ui';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import { LoadingButton } from '@mui/lab';
import { Box, Grid } from '@mui/material';
import Link from 'next/link';
import React, { useCallback } from 'react';
import { Controller, SubmitHandler, useForm, useFormState } from 'react-hook-form';

interface ISendEmailProps {
  isLoading: boolean;
  onConfirm: SubmitHandler<ISendEmailForm>;
}

interface ISendEmailForm {
  email: string;
}

export const SendEmail: React.FC<ISendEmailProps> = ({ isLoading, onConfirm }) => {
  const isAuth = useAppSelector(({ authReducer }) => authReducer.isAuth);

  const { handleSubmit, control, resetField } = useForm<ISendEmailForm>({ mode: 'onBlur' });
  const { errors, isValid } = useFormState({ control });

  const onClearEmail = useCallback(() => {
    resetField('email');
  }, [resetField]);

  return (
    <Box component="form" width="100%" noValidate sx={{ mt: 2 }} onSubmit={handleSubmit(onConfirm)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Controller
            defaultValue=""
            name="email"
            control={control}
            rules={emailValidation}
            render={({ field }) => (
              <TextInput
                {...field}
                required
                fullWidth
                type="email"
                label="Email Address"
                autoComplete="email"
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
                onClearValue={onClearEmail}
                disabled={isLoading}
              />
            )}
          />
        </Grid>

        <Grid
          item
          xs={12}
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <LoadingButton
            type="submit"
            variant="contained"
            sx={{ textTransform: 'none' }}
            disabled={!isValid || isLoading}
            loading={isLoading}
            loadingPosition="end"
            endIcon={<ForwardToInboxIcon />}
          >
            Submit
          </LoadingButton>

          <Link
            href={isAuth ? RoutesTypes.LOGIN : RoutesTypes.MAIN}
            style={{ textDecoration: 'none' }}
          >
            Cancel
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};
