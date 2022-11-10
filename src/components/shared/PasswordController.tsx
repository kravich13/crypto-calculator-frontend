import React from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';
import { PasswordInput } from './PasswordInput';

interface IPasswordControllerProps {
  name: 'password' | 'confirmPassword';
  control: Control<any, any>;
  rules: any;
  error: FieldError | undefined;
}

export const PasswordController: React.FC<IPasswordControllerProps> = ({
  name,
  control,
  rules,
  error,
}) => {
  return (
    <Controller
      defaultValue=""
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <PasswordInput
          {...field}
          required
          fullWidth
          label={name === 'password' ? 'Password' : 'Confirm password'}
          error={!!error}
          helperText={error?.message}
        />
      )}
    />
  );
};
