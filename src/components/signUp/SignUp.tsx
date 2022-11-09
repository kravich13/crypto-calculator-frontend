import { Box, Button, Grid } from '@mui/material';
import React, { useCallback } from 'react';
import { SubmitHandler, useForm, useFormState } from 'react-hook-form';
import { ILoginRequest } from '../../models/Auth';
import { emailValidation, passwordValidation } from '../../validation/validation';
import { PasswordController } from '../shared';
import { TextController } from '../shared/TextController';

interface ISignUpProps {
  onConfirm: SubmitHandler<ISignUpForm>;
}

export interface ISignUpForm extends ILoginRequest {
  confirmPassword: string;
}

export const SignUp: React.FC<ISignUpProps> = ({ onConfirm }) => {
  const { handleSubmit, control, resetField, getValues } = useForm<ISignUpForm>({ mode: 'onBlur' });
  const { errors, isValid } = useFormState({ control });

  const onClear = useCallback(() => {
    resetField('email');
  }, [resetField]);

  return (
    <Box component="form" noValidate onSubmit={handleSubmit(onConfirm)} sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextController
            inputType={'email'}
            name="email"
            label="Email"
            control={control}
            rules={emailValidation}
            error={errors.email}
            autoComplete="email"
            onClear={onClear}
          />
        </Grid>

        <Grid item xs={12}>
          <PasswordController
            name="password"
            control={control}
            rules={passwordValidation}
            error={errors.password}
          />
        </Grid>

        <Grid item xs={12}>
          <PasswordController
            name="confirmPassword"
            control={control}
            rules={{
              required: true,
              validate: (value: string) =>
                value === getValues('password') || 'Passwords do not match.',
            }}
            error={errors.confirmPassword}
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
