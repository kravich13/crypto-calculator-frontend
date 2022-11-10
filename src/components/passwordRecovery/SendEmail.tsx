import { Box, Button, Grid } from '@mui/material';
import React, { useCallback } from 'react';
import { Controller, SubmitHandler, useForm, useFormState } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { emailValidation } from '../../validation/validation';
import { TextInput } from '../shared';

interface ISendEmailProps {
  onConfirm: SubmitHandler<ISendEmailForm>;
}

interface ISendEmailForm {
  email: string;
}

export const SendEmail: React.FC<ISendEmailProps> = ({ onConfirm }) => {
  const { handleSubmit, control, resetField } = useForm<ISendEmailForm>({ mode: 'onBlur' });
  const { errors, isValid } = useFormState({ control });

  const onClearEmail = useCallback(() => {
    resetField('email');
  }, [resetField]);

  return (
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
          <Button
            type="submit"
            variant="contained"
            sx={{ textTransform: 'none' }}
            disabled={!isValid}
          >
            Submit
          </Button>

          <Link to={'/login'} style={{ textDecoration: 'none' }}>
            Cancel
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};
