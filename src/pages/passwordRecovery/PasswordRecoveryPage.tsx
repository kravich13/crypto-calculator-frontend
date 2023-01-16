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
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { INewPasswordForm, NewPassword } from '../../components/passwordRecovery/NewPassword';
import { SendEmail } from '../../components/passwordRecovery/SendEmail';
import { EmailCode, PopupAlert } from '../../components/shared';
import {
  useAppDispatch,
  useAppSelector,
  useAuthContext,
  useErrorMessage,
  useTypedNavigate,
} from '../../hooks';
import { ISetCodeInput, ISetEmailInput } from '../../models';
import { RoutesTypes } from '../../navigation';
import {
  useCodeEmailMutation,
  useForgotPasswordMutation,
  useNewPasswordMutation,
} from '../../services';
import { userDataSlice } from '../../store/reducers';

const PasswordRecoveryPage: React.FC = () => {
  const isMin800Width = useMediaQuery('(max-width:800px)');

  const navigate = useTypedNavigate();
  const dispatch = useAppDispatch();

  const { code: codeUserData, email: emailUserData } = useAppSelector(
    (state) => state.userDataReducer
  );
  const { login } = useAuthContext();

  const { setEmail, setCode, clearState } = userDataSlice.actions;

  const [step, setStep] = useState(0);

  const [forgotPassword, forgotPasswordData] = useForgotPasswordMutation();
  const [codeEmail, codeEmailData] = useCodeEmailMutation();
  const [newPassword, newPasswordData] = useNewPasswordMutation();

  const forgotPasswordErrorMessage = useErrorMessage(forgotPasswordData.error);
  const codeEmailErrorMessage = useErrorMessage(codeEmailData.error);
  const newPasswordErrorMessage = useErrorMessage(newPasswordData.error);

  const isError = forgotPasswordData.isError || codeEmailData.isError || newPasswordData.isError;
  const isLoading =
    forgotPasswordData.isLoading || codeEmailData.isLoading || newPasswordData.isLoading;
  const errorMessage =
    forgotPasswordErrorMessage || codeEmailErrorMessage || newPasswordErrorMessage;

  useEffect(() => {
    if (forgotPasswordData.data && step === 0) {
      setStep(1);
    } else if (codeEmailData.data && step === 1) {
      setStep(2);
    } else if (newPasswordData.data && step === 2) {
      login(newPasswordData.data);
      setStep(0);
      dispatch(clearState());
      navigate(RoutesTypes.MAIN);
    }
  }, [forgotPasswordData.data, codeEmailData.data, newPasswordData.data, navigate]);

  const onConfirmForgotPassword: SubmitHandler<ISetEmailInput> = useCallback(async ({ email }) => {
    dispatch(setEmail({ email }));
    await forgotPassword({ email });
  }, []);

  const onConfirmEmailCode: SubmitHandler<ISetCodeInput> = useCallback(
    async ({ code }) => {
      dispatch(setCode({ code }));
      await codeEmail({ code, email: emailUserData });
    },
    [emailUserData]
  );

  const onConfirmNewPassword: SubmitHandler<INewPasswordForm> = useCallback(
    async ({ password }) => {
      await newPassword({ email: emailUserData, code: codeUserData, password });
    },
    [emailUserData, codeEmailData]
  );

  const stepText = useMemo(() => {
    switch (step) {
      case 0:
        return 'Enter the email address for which you forgot the password.';
      case 1:
        return `A password recovery confirmation code has been sent to your email ${emailUserData}`;
      case 2:
        return 'Create a new password.';
    }
  }, [step, emailUserData]);

  const stepRender = useMemo(() => {
    switch (step) {
      case 0:
        return <SendEmail onConfirm={onConfirmForgotPassword} />;
      case 1:
        return <EmailCode buttonTitle="Send code" onConfirm={onConfirmEmailCode} />;
      case 2:
        return <NewPassword onConfirm={onConfirmNewPassword} />;
    }
  }, [step]);

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
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      {isError && <PopupAlert text={errorMessage} severity={'error'} variant={'filled'} />}

      <Container component="div" maxWidth={isMin800Width ? 'xs' : 'md'}>
        <Stepper activeStep={step} orientation={isMin800Width ? 'vertical' : 'horizontal'}>
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
                Confirm recovery code
              </Typography>
            </StepLabel>
          </Step>
          <Step>
            <StepLabel>
              <Typography component="p" variant="h6">
                Create a new password
              </Typography>
            </StepLabel>
          </Step>
        </Stepper>
      </Container>

      <Container component="div" maxWidth="xs" sx={{ marginTop: 8 }}>
        <Typography component="p" textAlign={'left'} width="100%">
          {stepText}
        </Typography>

        {stepRender}
      </Container>
    </Container>
  );
};

export default PasswordRecoveryPage;
