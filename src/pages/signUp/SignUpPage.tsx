import { Box, Container, Typography } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { EmailCode, IEmailCodeForm, PopupAlert } from '../../components/shared';
import { ISignUpForm, SignUp } from '../../components/signUp/SignUp';
import { useAppDispatch, useErrorMessage } from '../../hooks';
import { useCodeEmailMutation, useSignUpMutation } from '../../services';
import { authSlice, userDataSlice } from '../../store/reducers';

export const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { setAuth } = authSlice.actions;
  const { setEmail } = userDataSlice.actions;

  const [signUp, { isError: isSignUpError, data: signUpData, error: signUpError }] =
    useSignUpMutation();

  const [codeEmail, { isError: isCodeEmailError, data: codeEmailData, error: codeEmailError }] =
    useCodeEmailMutation();

  const signUpErrorMessage = useErrorMessage(signUpError);
  const codeEmailErrorMessage = useErrorMessage(codeEmailError);

  const [step, setStep] = useState(1);
  const [userEmail, setUserEmail] = useState('');

  const onConfirmSignUp: SubmitHandler<ISignUpForm> = useCallback(async ({ email, password }) => {
    await signUp({ email, password });

    setUserEmail(email);
  }, []);

  const onConfirmEmailCode: SubmitHandler<IEmailCodeForm> = useCallback(
    async ({ code }) => {
      await codeEmail({ code, email: userEmail });
    },
    [userEmail]
  );

  const stepRender = useMemo(() => {
    switch (step) {
      case 1:
        return <SignUp onConfirm={onConfirmSignUp} />;
      case 2:
        return <EmailCode onConfirm={onConfirmEmailCode} />;
    }
  }, [step]);

  useEffect(() => {
    if (step === 1 && signUpData) {
      dispatch(setEmail({ email: userEmail }));
      setStep(2);
    } else if (step === 2 && codeEmailData) {
      dispatch(setAuth(signUpData!));
      navigate('/');
    }
  }, [step, userEmail, signUpData, codeEmailData]);

  return (
    <Container component="main" maxWidth="xs" sx={{ width: '100%' }}>
      {(isSignUpError || isCodeEmailError) && (
        <PopupAlert
          text={signUpErrorMessage || codeEmailErrorMessage}
          severity={'error'}
          variant={'filled'}
        />
      )}

      <Box sx={{ marginTop: 8 }}>
        <Typography component="h1" variant="h5" textAlign={'left'} width={'100%'}>
          {step === 1 ? 'Sign up' : 'Verification code'}
        </Typography>

        {stepRender}
      </Box>
    </Container>
  );
};
