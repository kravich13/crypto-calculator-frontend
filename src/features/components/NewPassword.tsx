import { passwordValidation } from '@cc/entities/Authorization';
import { PasswordInput } from '@cc/shared';
import { Box, Button, Grid } from '@mui/material';
import React from 'react';
import { Controller, SubmitHandler, useForm, useFormState } from 'react-hook-form';

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
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={passwordValidation}
            render={({ field }) => (
              <PasswordInput
                label="Password"
                fullWidth={true}
                {...field}
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="confirmPassword"
            control={control}
            defaultValue=""
            rules={{
              required: true,
              validate: (value: string) =>
                value === getValues('password') || 'Passwords do not match.',
            }}
            render={({ field }) => (
              <PasswordInput
                label="Confirm password"
                fullWidth={true}
                {...field}
                error={Boolean(errors.confirmPassword)}
                helperText={errors.confirmPassword?.message}
              />
            )}
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
