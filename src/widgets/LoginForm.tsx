import { EmailCode, SendEmail } from '@cc/features';
import { useEmailValidateMutation, useSignInMutation } from '@cc/shared/api';
import { RoutesTypes } from '@cc/shared/enums';
import {
  useAppDispatch,
  useAppSelector,
  useAuthContext,
  useErrorMessage,
  userDataSlice,
} from '@cc/shared/lib';
import globalStyles from '@cc/shared/styles/Index.module.css';
import { ISetEmailInput } from '@cc/shared/types';
import { PopupAlert } from '@cc/shared/ui';
import { Box, Container, Step, StepLabel, Stepper, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';

interface IStepReturn {
  [key: number]: string | JSX.Element;
}

export const LoginForm = () => {
  const { login } = useAuthContext();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { setEmail, setEmailCodeExpiresIn } = userDataSlice.actions;

  const emailUser = useAppSelector((state) => state.userDataReducer.email);

  const [step, setStep] = useState(1);

  const [signIn, signUpData] = useSignInMutation();
  const [emailValidate, emailValidateData] = useEmailValidateMutation();

  const signUpError = useErrorMessage(signUpData.error);
  const emaemailValidateError = useErrorMessage(emailValidateData.error);

  const isLoading = signUpData.isLoading || emailValidateData.isLoading;
  const isError = signUpData.isError || emailValidateData.isError;

  const onSendEmail: SubmitHandler<ISetEmailInput> = useCallback(async (data) => {
    dispatch(setEmail(data));
    signIn(data);
  }, []);

  const onConfirmEmailCode: SubmitHandler<{ code: string }> = useCallback(
    ({ code }) => {
      emailValidate({ code, email: emailUser });
    },
    [emailUser]
  );

  const stepText: IStepReturn = useMemo(
    () => ({
      0: 'Enter email to login',
      1: `Enter code sent to your email ${emailUser}`,
    }),
    [emailUser]
  );

  const stepRender: IStepReturn = useMemo(
    () => ({
      0: <SendEmail isLoading={isLoading} onConfirm={onSendEmail} />,
      1: <EmailCode isLoading={isLoading} onConfirm={onConfirmEmailCode} />,
    }),
    [isLoading, onConfirmEmailCode]
  );

  useEffect(() => {
    if (step === 0 && signUpData.data) {
      setEmailCodeExpiresIn(signUpData.data);
      setStep(1);
    } else if (step === 1 && emailValidateData.data) {
      login(emailValidateData.data);
      router.push(RoutesTypes.MAIN);
    }
  }, [step, signUpData.data, emailValidateData.data]);

  return (
    <Container maxWidth="xs" className={globalStyles.opacityContainer}>
      {isError && (
        <PopupAlert text={signUpError || emaemailValidateError} severity="error" variant="filled" />
      )}

      <Typography component="h1" variant="h5" textAlign="left" width="100%" mb={3}>
        Log In
      </Typography>

      <Stepper activeStep={step} orientation="vertical">
        <Step>
          <StepLabel>
            <Typography component="p" variant="h6">
              Specify email
            </Typography>
          </StepLabel>
        </Step>

        <Step>
          <StepLabel>
            <Typography component="p" variant="h6">
              Confirm login code
            </Typography>
          </StepLabel>
        </Step>
      </Stepper>

      <Box sx={{ mt: 4 }}>
        <Typography component="p" textAlign="left" width="100%" sx={{ mb: 3 }}>
          {stepText[step]}
        </Typography>

        {stepRender[step]}
      </Box>
    </Container>
  );
};
