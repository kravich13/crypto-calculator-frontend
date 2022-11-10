import { Box, Container, Typography } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { INewPasswordForm, NewPassword } from '../../components/passwordRecovery/NewPassword';
import { SendEmail } from '../../components/passwordRecovery/SendEmail';
import { EmailCode, PopupAlert } from '../../components/shared';
import { useAppDispatch, useAppSelector, useErrorMessage } from '../../hooks';
import { ISetCodeInput, ISetEmailInput } from '../../models';
import {
  useCodeEmailMutation,
  useForgotPasswordMutation,
  useNewPasswordMutation,
} from '../../services';
import { authSlice, userDataSlice } from '../../store/reducers';

export const PasswordRecoveryPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { code: codeUserData, email: emailUserData } = useAppSelector(
    (state) => state.userDataReducer
  );

  const { setEmail, setCode, clearState: clearUserDataState } = userDataSlice.actions;
  const { setAuth } = authSlice.actions;

  const [step, setStep] = useState(1);

  const [forgotPassword, forgotPasswordData] = useForgotPasswordMutation();
  const [codeEmail, codeEmailData] = useCodeEmailMutation();
  const [newPassword, newPasswordData] = useNewPasswordMutation();

  const forgotPasswordErrorMessage = useErrorMessage(forgotPasswordData.error);
  const codeEmailErrorMessage = useErrorMessage(codeEmailData.error);
  const newPasswordErrorMessage = useErrorMessage(newPasswordData.error);

  const isError = forgotPasswordData.isError || codeEmailData.isError || newPasswordData.isError;
  const errorMessage =
    forgotPasswordErrorMessage || codeEmailErrorMessage || newPasswordErrorMessage;

  useEffect(() => {
    if (forgotPasswordData.data && step === 1) {
      setStep(2);
    } else if (codeEmailData.data && step === 2) {
      setStep(3);
    } else if (newPasswordData.data && step === 3) {
      const { accessToken, accessTokenExpiresIn, refreshToken, refreshTokenExpiresIn } =
        newPasswordData.data;

      navigate('/');
      setStep(1);
      dispatch(clearUserDataState());
      dispatch(setAuth({ accessToken, refreshToken, accessTokenExpiresIn, refreshTokenExpiresIn }));
    }
  }, [forgotPasswordData.data, codeEmailData.data, newPasswordData.data]);

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
      case 1:
        return 'Enter the email address for which you forgot the password.';
      case 2:
        return `A password recovery confirmation code has been sent to your email ${emailUserData}.`;
      case 3:
        return 'Create a new password.';
    }
  }, [step, emailUserData]);

  const stepRender = useMemo(() => {
    switch (step) {
      case 1:
        return <SendEmail onConfirm={onConfirmForgotPassword} />;
      case 2:
        return <EmailCode onConfirm={onConfirmEmailCode} />;
      case 3:
        return <NewPassword onConfirm={onConfirmNewPassword} />;
    }
  }, [step]);

  return (
    <Container component="main" maxWidth="xs" sx={{ width: '100%' }}>
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

        {stepRender}
      </Box>
    </Container>
  );
};
