import { emailValidation } from '@cc/entities/Authorization';
import { TextInput, Typography } from '@cc/shared/ui';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import { LoadingButton } from '@mui/lab';
import { Box, Grid } from '@mui/material';
import { useTranslation } from 'next-i18next';
import React, { useCallback } from 'react';
import { Controller, SubmitHandler, useForm, useFormState } from 'react-hook-form';

interface ISendEmailProps {
  isLoading: boolean;
  onConfirm: SubmitHandler<ISendEmailForm>;
}

interface ISendEmailForm {
  email: string;
}

export const SendEmail: React.FC<ISendEmailProps> = ({ isLoading, onConfirm }) => {
  const { handleSubmit, control, resetField } = useForm<ISendEmailForm>({ mode: 'onBlur' });
  const { errors, isValid } = useFormState({ control });
  const { t } = useTranslation();

  const onClearEmail = useCallback(() => {
    resetField('email');
  }, [resetField]);

  return (
    <Box component="form" width="100%" noValidate onSubmit={handleSubmit(onConfirm)}>
      <Grid container spacing={3}>
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
                type="email"
                label={t('cc.feature.sendEmail.inputLabel')}
                autoComplete="email"
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
                onClearValue={onClearEmail}
                disabled={isLoading}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <LoadingButton
            fullWidth
            type="submit"
            variant="contained"
            disabled={!isValid}
            loading={isLoading}
            loadingPosition="end"
            endIcon={<ForwardToInboxIcon />}
          >
            <Typography noWrap>{t('cc.feature.sendEmail.submitButton')}</Typography>
          </LoadingButton>
        </Grid>
      </Grid>
    </Box>
  );
};
