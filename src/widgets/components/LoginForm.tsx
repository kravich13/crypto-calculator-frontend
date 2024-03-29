import { EmailCode, SendEmail } from '@cc/features';
import { useEmailValidateMutation, useSignInMutation } from '@cc/shared/api';
import { RoutesTypes } from '@cc/shared/enums';
import {
  authActions,
  useAppDispatch,
  useAppSelector,
  useAuthContext,
  useErrorMessage,
} from '@cc/shared/lib';
import { ISetEmailInput } from '@cc/shared/types';
import { LayoutContent, PopupAlert, Typography } from '@cc/shared/ui';
import { Box, Step, StepLabel, Stepper } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';

export const LoginForm = () => {
  const { login } = useAuthContext();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const emailUser = useAppSelector((state) => state.authReducer.email);

  const [step, setStep] = useState(0);

  const [signIn, signUpData] = useSignInMutation();
  const [emailValidate, emailValidateData] = useEmailValidateMutation();

  const signUpError = useErrorMessage(signUpData.error);
  const emailValidateError = useErrorMessage(emailValidateData.error);

  const isLoading = signUpData.isLoading || emailValidateData.isLoading;
  const isError = signUpError.showError || emailValidateError.showError;
  const errorMessage = signUpError.message || emailValidateError.message;

  const onSendEmail: SubmitHandler<ISetEmailInput> = useCallback(async (data) => {
    dispatch(authActions.setEmail(data));
    signIn(data);
  }, []);

  const onConfirmEmailCode: SubmitHandler<{ code: string }> = useCallback(
    ({ code }) => {
      emailValidate({ code, email: emailUser });
    },
    [emailUser]
  );

  const stepText = useMemo(
    (): Record<number, string> => ({
      0: t('cc.widget.loginForm.step1.stepperLabel'),
      1: `${t('cc.widget.loginForm.step2.stepperLabel')} ${emailUser}`,
    }),
    [emailUser, t]
  );

  const stepRender = useMemo(
    (): Record<number, JSX.Element> => ({
      0: <SendEmail isLoading={isLoading} onConfirm={onSendEmail} />,
      1: <EmailCode isLoading={isLoading} onConfirm={onConfirmEmailCode} />,
    }),
    [isLoading, onConfirmEmailCode]
  );

  useEffect(() => {
    if (step === 0 && signUpData.data) {
      const { emailCodeResendExpiresIn } = signUpData.data;

      dispatch(authActions.setEmailCodeResendExpiresIn({ emailCodeResendExpiresIn }));
      setStep(1);
    } else if (step === 1 && emailValidateData.data) {
      login({ tokensData: emailValidateData.data });
      router.push(RoutesTypes.MAIN);
    }
  }, [step, signUpData.data, emailValidateData.data, emailUser]);

  return (
    <LayoutContent isCenterPosition containerStyles={{ maxWidth: 'xs' }}>
      {isError && <PopupAlert text={errorMessage} severity="error" variant="filled" />}

      <Typography tint component="h1" variant="h5" textAlign="left" width="100%" mb={3}>
        {t('cc.widget.loginForm.title')}
      </Typography>

      <Stepper activeStep={step} orientation="vertical">
        <Step>
          <StepLabel>
            <Typography component="p" variant="h6">
              {t('cc.widget.loginForm.step1.stepperLabel')}
            </Typography>
          </StepLabel>
        </Step>

        <Step>
          <StepLabel>
            <Typography component="p" variant="h6">
              {t('cc.widget.loginForm.step2.stepperLabel')}
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
    </LayoutContent>
  );
};
