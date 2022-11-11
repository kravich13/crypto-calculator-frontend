import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { Controller, SubmitHandler, useForm, useFormState } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { PopupAlert, TextInput } from '../../components/shared';
import { PasswordInput } from '../../components/shared/PasswordInput';
import { useAppDispatch, useErrorMessage } from '../../hooks';
import { useSignInMutation } from '../../services';
import { authSlice } from '../../store/reducers';
import { emailValidation, passwordValidation } from '../../validation/validation';

interface IFormInputs {
  email: string;
  password: string;
}

export const LogInPage: React.FC = () => {
  const navigate = useNavigate();
  const { setAuth } = authSlice.actions;
  const dispatch = useAppDispatch();

  const { handleSubmit, control, resetField } = useForm<IFormInputs>({ mode: 'onBlur' });
  const { errors, isValid } = useFormState({ control });

  const [signIn, { isError, data, error }] = useSignInMutation();
  const errorMessage = useErrorMessage(error);

  const onConfirm: SubmitHandler<IFormInputs> = useCallback(async ({ email, password }) => {
    await signIn({ email, password });
  }, []);

  const onClearEmail = useCallback(() => {
    resetField('email');
  }, [resetField]);

  useEffect(() => {
    if (data) {
      dispatch(setAuth(data));
      navigate('/');
    }
  }, [data, navigate]);

  return (
    <Container
      component="main"
      maxWidth="xl"
      sx={{ width: '100%', height: '100%', padding: 3, display: 'flex', alignItems: 'center' }}
    >
      {isError && <PopupAlert text={errorMessage} severity={'error'} variant={'filled'} />}

      <Container component="div" maxWidth="xs" sx={{ marginTop: 8 }}>
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

          <Link to={'/password-recovery'} style={{ textDecoration: 'none' }}>
            Forgot password?
          </Link>
        </Box>
      </Container>
    </Container>
  );
};
