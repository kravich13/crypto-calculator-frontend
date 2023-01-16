import { Box, Button, Grid } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { SubmitHandler, useForm, useFormState } from 'react-hook-form';
import { ILoginRequest } from '../../models/Auth';
import { emailValidation, passwordValidation } from '../../validation';
import { PasswordController, TextController } from '../shared/controllers';

interface ISignUpProps {
  onConfirm: SubmitHandler<ISignUpForm & INeedActivateAccount>;
}

export interface ISignUpForm extends ILoginRequest {
  confirmPassword: string;
}

export interface INeedActivateAccount {
  activateAccount: boolean;
}

export const SignUp: React.FC<ISignUpProps> = React.memo(({ onConfirm }) => {
  const { handleSubmit, control, resetField, getValues } = useForm<ISignUpForm>({ mode: 'onBlur' });
  const { errors, isValid } = useFormState({ control });

  const [activateAccount, setActivateAccount] = useState(false);

  const onClear = useCallback(() => {
    resetField('email');
  }, [resetField]);

  const onClickNext = useCallback(() => {
    setActivateAccount(true);
  }, []);

  const onSubmit = useCallback(
    (event: React.ChangeEvent<HTMLFormElement>) => {
      event.preventDefault();

      handleSubmit((data) => {
        onConfirm({ ...data, activateAccount });
      })();
      setActivateAccount(false);
    },
    [activateAccount]
  );

  return (
    <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 3 }}>
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

      <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          sx={{ mt: 3, mb: 2, textTransform: 'none', width: '120px' }}
          type="submit"
          variant="contained"
          disabled={!isValid}
        >
          Sign up now
        </Button>

        <Button
          sx={{ mt: 3, mb: 2, textTransform: 'none', width: '120px' }}
          type="submit"
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
