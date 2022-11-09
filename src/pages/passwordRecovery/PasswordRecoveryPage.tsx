import { Box, Button, Container, Grid, Typography } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Controller, SubmitHandler, useForm, useFormState } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { PopupAlert, TextInput } from '../../components/shared';
import { useErrorMessage } from '../../hooks';
import { useForgotPasswordMutation } from '../../services';
import { emailValidation } from '../../validation/validation';

interface IFormInputs {
  email: string;
}

interface ISubmitButtonProps {
  disabled: boolean;
  title: string;
}

export const PasswordRecoveryPage: React.FC = () => {
  const [step, setStep] = useState(1);

  const { handleSubmit, control, resetField } = useForm<IFormInputs>({ mode: 'onBlur' });
  const { errors, isValid } = useFormState({ control });

  const [forgotPassword, { isError, data, error }] = useForgotPasswordMutation();
  const errorMessage = useErrorMessage(error);

  const onClearEmail = useCallback(() => {
    resetField('email');
  }, [resetField]);

  const onConfirm: SubmitHandler<IFormInputs> = useCallback(
    async ({ email }) => {
      if (step === 1) {
        // await forgotPassword({ email });
        setStep(2);
      } else if (step === 2) {
        setStep(3);
      }
    },
    [step]
  );

  const stepText = useMemo(() => {
    switch (step) {
      case 1:
        return 'Enter the email address for which you forgot the password.';
      case 2:
        return 'An email with a password recovery code has been sent to your email.';
      case 3:
        return 'Create a new password.';
    }
  }, [step]);

  const submitButton = useCallback(
    ({ disabled, title }: ISubmitButtonProps) => (
      <Button type="submit" variant="contained" sx={{ textTransform: 'none' }} disabled={disabled}>
        {title}
      </Button>
    ),
    []
  );

  const buttonsRender = useMemo(() => {
    switch (step) {
      case 1:
        return (
          <>
            {submitButton({ disabled: !isValid, title: 'Submit' })}

            <Link to={'/login'} style={{ textDecoration: 'none' }}>
              Cancel
            </Link>
          </>
        );
      case 2:
        return submitButton({ disabled: !isValid, title: 'Send code' });
      case 3:
        return submitButton({ disabled: !isValid, title: 'Submit' });
    }
  }, [step, isValid]);

  return (
    <Container component="main" maxWidth="xs">
      {isError && <PopupAlert text={errorMessage} severity={'error'} variant={'filled'} />}

      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography>{step}/3</Typography>

        <Typography component="h1" variant="h5" textAlign={'center'} mb={1}>
          Password recovery
        </Typography>

        <Typography component="p" textAlign={'left'} width="100%">
          {stepText}
        </Typography>

        <Box
          component="form"
          width={'100%'}
          noValidate
          sx={{ mt: 2 }}
          onSubmit={handleSubmit(onConfirm)}
        >
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
              {buttonsRender}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
