import { emailValidation, logInPasswordValidation } from '@cc/entities/Authorization';
import { useSignInMutation } from '@cc/shared/api';
import { RoutesTypes } from '@cc/shared/enums';
import { useAuthContext, useErrorMessage } from '@cc/shared/lib';
import { PasswordInput, PopupAlert, TextInput } from '@cc/shared/ui';
import LoginIcon from '@mui/icons-material/Login';
import { LoadingButton } from '@mui/lab';
import { Box, Container, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { Controller, SubmitHandler, useForm, useFormState } from 'react-hook-form';

interface IFormInputs {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const { login } = useAuthContext();
  const router = useRouter();

  const { handleSubmit, control, resetField } = useForm<IFormInputs>({ mode: 'onBlur' });
  const { errors, isValid } = useFormState({ control });

  const [signIn, { isError, data, error, isLoading }] = useSignInMutation();
  const errorMessage = useErrorMessage(error);

  const onConfirm: SubmitHandler<IFormInputs> = useCallback(({ email, password }) => {
    signIn({ email, password });
  }, []);

  const onClearEmail = useCallback(() => {
    resetField('email');
  }, [resetField]);

  useEffect(() => {
    if (data) {
      router.push(RoutesTypes.MAIN);
      login(data);
    }
  }, [data]);

  return (
    <>
      {isError && <PopupAlert text={errorMessage} severity="error" variant="filled" />}

      <Container maxWidth="xs">
        <Typography component="h1" variant="h5" textAlign="left" width="100%" mb={3}>
          Log In
        </Typography>

        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit(onConfirm)}>
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
                    onClearValue={onClearEmail}
                    fullWidth={true}
                    error={Boolean(errors.email)}
                    helperText={errors.email?.message}
                    disabled={isLoading}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                rules={logInPasswordValidation}
                render={({ field }) => (
                  <PasswordInput
                    label="Password"
                    fullWidth={true}
                    {...field}
                    error={Boolean(errors.password)}
                    helperText={errors.password?.message}
                    disabled={isLoading}
                  />
                )}
              />
            </Grid>
          </Grid>

          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, textTransform: 'none' }}
            disabled={!isValid || isLoading}
            loading={isLoading}
            loadingPosition="end"
            endIcon={<LoginIcon />}
          >
            Log in
          </LoadingButton>

          <Link href={RoutesTypes.PASSWORD_RECOVERY} style={{ textDecoration: 'none' }}>
            Forgot password?
          </Link>
        </Box>
      </Container>
    </>
  );
};
