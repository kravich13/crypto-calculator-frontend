import { Box, Button, Grid } from '@mui/material';
import React from 'react';
import { SubmitHandler, useForm, useFormState } from 'react-hook-form';
import { passwordValidation } from '../../validation';
import { PasswordController } from '../shared/controllers';

interface INewPasswordProps {
  onConfirm: SubmitHandler<INewPasswordForm>;
}

export interface INewPasswordForm {
  password: string;
  confirmPassword: string;
}

export const NewPassword: React.FC<INewPasswordProps> = ({ onConfirm }) => {
  const { handleSubmit, control, getValues } = useForm<INewPasswordForm>({
    mode: 'onBlur',
  });
  const { errors, isValid } = useFormState({ control });

  return (
    <Box component="form" noValidate onSubmit={handleSubmit(onConfirm)} sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <PasswordController
            name="password"
            control={control}
            rules={passwordValidation}
            error={errors.password}
          />
        </Grid>

        <Grid item xs={12}>
          <PasswordController
            name="confirmPassword"
            control={control}
            rules={{
              required: true,
              validate: (value: string) =>
                value === getValues('password') || 'Passwords do not match.',
            }}
            error={errors.confirmPassword}
          />
        </Grid>
      </Grid>

      <Button
        sx={{ mt: 3, mb: 2, textTransform: 'none' }}
        type="submit"
        fullWidth
        variant="contained"
        disabled={!isValid}
      >
        Submit
      </Button>
    </Box>
  );
};
