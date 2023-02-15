import { emailValidation, passwordValidation } from '@cc/entities/Authorization';
import { ILoginRequest, PasswordInput, TextInput } from '@cc/shared';
import { Box, Button, Grid } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { Controller, SubmitHandler, useForm, useFormState } from 'react-hook-form';

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
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={emailValidation}
            render={({ field }) => (
              <TextInput
                {...field}
                type="email"
                label="Email"
                autoComplete="Email"
                onClearValue={onClear}
                fullWidth={true}
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{
              required: true,
              validate: (value: string) =>
                value === getValues('password') || 'Passwords do not match.',
            }}
            render={({ field }) => (
              <PasswordInput
                label="Password"
                fullWidth={true}
                {...field}
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="confirmPassword"
            control={control}
            defaultValue=""
            rules={passwordValidation}
            render={({ field }) => (
              <PasswordInput
                label="Confirm password"
                fullWidth={true}
                {...field}
                error={Boolean(errors.confirmPassword)}
                helperText={errors.confirmPassword?.message}
              />
            )}
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
