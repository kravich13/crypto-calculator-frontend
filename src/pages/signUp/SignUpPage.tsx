import {
  Backdrop,
  CircularProgress,
  Container,
  Step,
  StepLabel,
  Stepper,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { EmailCode, IEmailCodeForm, PopupAlert } from '../../components/shared';
import { INeedActivateAccount, ISignUpForm, SignUp } from '../../components/signUp';
import {
  useAppDispatch,
  useAppSelector,
  useAuthContext,
  useErrorMessage,
  useTypedNavigate,
} from '../../hooks';
import { RoutesTypes } from '../../navigation';
import { useEmailValidateMutation, useSignUpMutation } from '../../services';
import { userDataSlice } from '../../store/reducers';

const SignUpPage: React.FC = () => {
  const isMin500Width = useMediaQuery('(max-width:400px)');

  const navigate = useTypedNavigate();
  const dispatch = useAppDispatch();
  const { setEmail } = userDataSlice.actions;

  const { email: emailUserData } = useAppSelector((state) => state.userDataReducer);
  const { login } = useAuthContext();

  const [signUp, signUpData] = useSignUpMutation();
  const [emailValidate, emailValidateData] = useEmailValidateMutation();

  const signUpErrorMessage = useErrorMessage(signUpData.error);
  const codeEmailErrorMessage = useErrorMessage(emailValidateData.error);

  const [step, setStep] = useState(0);
  const [activateAccount, setActivateAccount] = useState<boolean>();

  const onConfirmSignUp: SubmitHandler<ISignUpForm & INeedActivateAccount> = useCallback(
    async ({ email, password, activateAccount: inputActivateAccount }) => {
      await signUp({ email, password });
      dispatch(setEmail({ email }));

      setActivateAccount(inputActivateAccount);
    },
    []
  );

  const onConfirmEmailCode: SubmitHandler<IEmailCodeForm> = useCallback(
    async ({ code }) => {
      await emailValidate({ code, authorization: signUpData.data!.accessToken });
    },
    [signUpData.data?.accessToken]
  );

  const stepRender = useMemo(() => {
    switch (step) {
      case 0:
        return <SignUp onConfirm={onConfirmSignUp} />;
      case 1:
        return <EmailCode buttonTitle="Activate account" onConfirm={onConfirmEmailCode} />;
    }
  }, [step]);

  useEffect(() => {
    const hasSignUpData = step === 0 && signUpData.data;

    if (hasSignUpData && activateAccount === false) {
      login(signUpData.data!);
      navigate(RoutesTypes.MAIN);
    } else if (hasSignUpData && activateAccount) {
      setStep(1);
    } else if (step === 1 && emailValidateData.data) {
      login(signUpData.data!);
      setStep(0);
      navigate(RoutesTypes.MAIN);
    }
  }, [step, activateAccount, signUpData.data, emailValidateData.data, navigate]);

  return (
    <Container
      component="main"
      maxWidth="xl"
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3,
      }}
    >
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={signUpData.isLoading || emailValidateData.isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {(signUpData.isError || emailValidateData.isError) && (
        <PopupAlert
          text={signUpErrorMessage || codeEmailErrorMessage}
          severity={'error'}
          variant={'filled'}
        />
      )}

      {step === 1 && signUpData.data && (
        <PopupAlert
          text={'Account has been successfully created.'}
          severity={'success'}
          variant={'filled'}
        />
      )}

      <Container component="div" maxWidth={isMin500Width ? 'xs' : 'sm'}>
        <Stepper activeStep={step} orientation={isMin500Width ? 'vertical' : 'horizontal'}>
          <Step>
            <StepLabel>
              <Typography component="p" variant="h6">
                Sign up
              </Typography>
            </StepLabel>
          </Step>
          <Step>
            <StepLabel optional={'Optional'}>
              <Typography component="p" variant="h6">
                Verification code
              </Typography>
            </StepLabel>
          </Step>
        </Stepper>
      </Container>

      <Container component="div" maxWidth="xs" sx={{ marginTop: 1 }}>
        <Typography
          component="p"
          variant="subtitle1"
          textAlign={'left'}
          width={'100%'}
          marginTop={3}
        >
          {step === 0
            ? 'When you activate the verification code, all the functions of the application will be available.'
            : `An email with a verification code has been sent to ${emailUserData}`}
        </Typography>

        {stepRender}
      </Container>
    </Container>
  );
};

export default SignUpPage;
