import { emailCodeValidation } from '@cc/entities/Authorization';
import { useSignInMutation } from '@cc/shared/api';
import { EMAIL_CODE_MAX, EMAIL_CODE_MIN } from '@cc/shared/const';
import { authActions, useAppDispatch, useAppSelector, useErrorMessage } from '@cc/shared/lib';
import { PopupAlert, TextInput, Timer } from '@cc/shared/ui/components';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import LoginIcon from '@mui/icons-material/Login';
import { LoadingButton } from '@mui/lab';
import { Box, Grid, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import React, { useCallback, useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm, useFormState } from 'react-hook-form';

interface IEmailCodeProps {
  isLoading: boolean;
  onConfirm: SubmitHandler<IEmailCodeForm>;
}

interface IEmailCodeForm {
  code: string;
}

export const EmailCode: React.FC<IEmailCodeProps> = React.memo(({ isLoading, onConfirm }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const email = useAppSelector((state) => state.authReducer.email);
  const emailCodeResendExpiresIn = useAppSelector(
    (state) => state.authReducer.emailCodeResendExpiresIn
  );

  const { handleSubmit, control, resetField } = useForm<IEmailCodeForm>({ mode: 'onBlur' });
  const { errors, isValid } = useFormState({ control });

  const [signIn, signInData] = useSignInMutation();
  const signUpError = useErrorMessage(signInData.error);

  const loading = isLoading || signInData.isLoading;

  const [isDisabledSendEmail, setDisabledSendEmail] = useState(true);

  const onClear = useCallback(() => {
    resetField('code');
  }, [resetField]);

  const onSendEmail = useCallback(() => {
    signIn({ email });
  }, [email]);

  useEffect(() => {
    const signUpPayload = signInData.data;

    if (signUpPayload) {
      dispatch(
        authActions.setEmailCodeResendExpiresIn({
          emailCodeResendExpiresIn: signUpPayload.emailCodeResendExpiresIn,
        })
      );
    }
  }, [signInData.data]);

  useEffect(() => {
    if (emailCodeResendExpiresIn < Date.now()) {
      setDisabledSendEmail(false);
    }

    const id = setInterval(() => {
      if (emailCodeResendExpiresIn < Date.now()) {
        setDisabledSendEmail(false);
        clearInterval(id);
      } else {
        setDisabledSendEmail(true);
      }
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, [emailCodeResendExpiresIn]);

  return (
    <Box component="form" noValidate onSubmit={handleSubmit(onConfirm)}>
      {signUpError.showError && (
        <PopupAlert text={signUpError.message} severity="error" variant="filled" />
      )}

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Controller
            defaultValue=""
            name="code"
            control={control}
            rules={emailCodeValidation}
            render={({ field }) => (
              <TextInput
                {...field}
                inputProps={{ min: EMAIL_CODE_MIN, max: EMAIL_CODE_MAX }}
                required
                fullWidth
                type="number"
                label={t('cc.page.login.emailCode.inputLabel')}
                autoComplete="Code"
                error={Boolean(errors.code)}
                helperText={errors.code?.message}
                onClearValue={onClear}
                disabled={isLoading}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <LoadingButton
            sx={{ textTransform: 'none' }}
            type="submit"
            fullWidth
            variant="contained"
            disabled={!isValid}
            loading={loading}
            loadingPosition="end"
            endIcon={<LoginIcon />}
          >
            <Typography noWrap>{t('cc.page.login.emailCode.button.confirm')}</Typography>
          </LoadingButton>
        </Grid>

        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <LoadingButton
            onClick={onSendEmail}
            variant="text"
            disabled={isDisabledSendEmail}
            loading={loading}
            loadingPosition="end"
            endIcon={<ForwardToInboxIcon />}
          >
            <Typography noWrap mr={0.5}>
              {t('cc.page.login.emailCode.button.sendAgain')}
            </Typography>

            <Timer inputDate={emailCodeResendExpiresIn} />
          </LoadingButton>
        </Grid>
      </Grid>
    </Box>
  );
});
