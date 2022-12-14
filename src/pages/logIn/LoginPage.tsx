import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { useCallback } from 'react';
import { Controller, SubmitHandler, useForm, useFormState } from 'react-hook-form';
import { PasswordInput } from '../../components/shared/PasswordInput';
import { TextInput } from '../../components/shared';
import { emailValidation, passwordValidation } from '../../validation/validation';

interface IFormInputs {
  email: string;
  password: string;
}

export const LogInPage: React.FC = () => {
  const { handleSubmit, control, resetField } = useForm<IFormInputs>({ mode: 'onBlur' });
  const { errors, isValid } = useFormState({ control });

  const onConfirm: SubmitHandler<IFormInputs> = useCallback(({ email }) => {}, []);

  const onClearEmail = useCallback(() => {
    resetField('email');
  }, [resetField]);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5" textAlign={'left'} width={'100%'}>
          Log In
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit(onConfirm)}>
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
                    label="Email Address"
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
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, textTransform: 'none' }}
            disabled={!isValid}
          >
            Log in
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
