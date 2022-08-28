import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { useCallback } from 'react';
import { Controller, SubmitHandler, useForm, useFormState } from 'react-hook-form';
import { PasswordInput, TextInput } from '../../components/shared';
import { emailValidation, passwordValidation } from '../../validation/validation';

interface IFormInputs {
  email: string;
  password: string;
  confirmPassword: string;
}

export const SignUpPage: React.FC = () => {
  const { handleSubmit, control, resetField, getValues } = useForm<IFormInputs>({ mode: 'onBlur' });
  const { errors, isValid } = useFormState({ control });

  const onConfirm: SubmitHandler<IFormInputs> = useCallback(
    ({ email, password, confirmPassword }) => {},
    []
  );

  const onClearEmail = useCallback(() => {
    resetField('email');
  }, [resetField]);

  return (
    <Container component="main" maxWidth="xs" sx={{ width: '100%', height: '100%' }}>
      <Box sx={{ marginTop: 8 }}>
        <Typography component="h1" variant="h5" textAlign={'left'} width={'100%'}>
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit(onConfirm)} sx={{ mt: 3 }}>
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
                    type={'email'}
                    label="Email"
                    autoComplete="email"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    onClearValue={onClearEmail}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                defaultValue=""
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
                defaultValue=""
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
                    label={'Password'}
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
      </Box>
    </Container>
  );
};
