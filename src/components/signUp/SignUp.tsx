import { Box, Button, Grid, Typography } from '@mui/material';
import { FC, useCallback } from 'react';
import { Controller, SubmitHandler, useForm, useFormState } from 'react-hook-form';
import { ILoginRequest } from '../../models/Auth';
import { emailValidation, passwordValidation } from '../../validation/validation';
import { PasswordInput, TextInput } from '../shared';

interface ISignUpProps {
  onConfirm: SubmitHandler<ISignUpForm>;
}

export interface ISignUpForm extends ILoginRequest {
  confirmPassword: string;
}

export const SignUp: FC<ISignUpProps> = ({ onConfirm }) => {
  const { handleSubmit, control, resetField, getValues } = useForm<ISignUpForm>({ mode: 'onBlur' });
  const { errors, isValid } = useFormState({ control });

  const onClear = useCallback(() => {
    resetField('email');
  }, [resetField]);

  return (
    <Box component="form" noValidate onSubmit={handleSubmit(onConfirm)} sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Controller
            defaultValue="corlack1997@gmail.com"
            name="email"
            control={control}
            rules={emailValidation}
            render={({ field }) => (
              <TextInput
                {...field}
                required
                fullWidth
                type={'email'}
                label="Email"
                autoComplete="email"
                error={!!errors.email}
                helperText={errors.email?.message}
                onClearValue={onClear}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            defaultValue="bizeC78Qp#pX8@7"
            name="password"
            control={control}
            rules={passwordValidation}
            render={({ field }) => (
              <PasswordInput
                {...field}
                required
                fullWidth
                label={'Password'}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            defaultValue="bizeC78Qp#pX8@7"
            name="confirmPassword"
            control={control}
            rules={{
              required: true,
              validate: (value) => value === getValues('password') || 'Passwords do not match.',
            }}
            render={({ field }) => (
              <PasswordInput
                {...field}
                required
                fullWidth
                label={'Confirm password'}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
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
        Sign up
      </Button>
    </Box>
  );
};
