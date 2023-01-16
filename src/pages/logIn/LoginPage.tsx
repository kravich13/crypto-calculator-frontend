import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { SubmitHandler, useForm, useFormState } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { PopupAlert } from '../../components/shared';
import { PasswordController, TextController } from '../../components/shared/controllers';
import { useAuthContext, useErrorMessage, useTypedNavigate } from '../../hooks';
import { RoutesTypes } from '../../navigation';
import { useSignInMutation } from '../../services';
import { emailValidation, logInPasswordValidation } from '../../validation';

interface IFormInputs {
  email: string;
  password: string;
}

const LogInPage: React.FC = () => {
  const { login } = useAuthContext();
  const navigate = useTypedNavigate();

  const { handleSubmit, control, resetField } = useForm<IFormInputs>({ mode: 'onBlur' });
  const { errors, isValid } = useFormState({ control });

  const [signIn, { isError, data, error }] = useSignInMutation();
  const errorMessage = useErrorMessage(error);

  const onConfirm: SubmitHandler<IFormInputs> = useCallback(({ email, password }) => {
    signIn({ email, password });
  }, []);

  const onClearEmail = useCallback(() => {
    resetField('email');
  }, [resetField]);

  useEffect(() => {
    if (data) {
      login(data);
      navigate(RoutesTypes.MAIN);
    }
  }, [data, navigate]);

  return (
    <Container
      component="main"
      maxWidth="xl"
      sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', padding: 3 }}
    >
      {isError && <PopupAlert text={errorMessage} severity={'error'} variant={'filled'} />}

      <Container maxWidth="xs">
        <Typography component="h1" variant="h5" textAlign={'left'} width={'100%'}>
          Log In
        </Typography>

        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit(onConfirm)}>
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
                onClear={onClearEmail}
              />
            </Grid>

            <Grid item xs={12}>
              <PasswordController
                name="password"
                control={control}
                rules={logInPasswordValidation}
                error={errors.password}
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

export default LogInPage;
