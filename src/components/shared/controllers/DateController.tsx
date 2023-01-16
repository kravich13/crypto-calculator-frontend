import { TextField } from '@mui/material';
import React from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';

interface DateControllerProps {
  name: string;
  label: string;
  control: Control<any, any>;
  rules?: any;
  error?: FieldError;
  autoComplete?: string;
}

export const DateControlller: React.FC<DateControllerProps> = ({
  name,
  label,
  control,
  rules,
  error,
  autoComplete,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <TextField
          {...field}
          defaultValue=""
          type="date"
          required
          fullWidth
          label={label}
          autoComplete={autoComplete}
          error={!!error}
          helperText={error?.message}
          InputLabelProps={{
            shrink: true,
          }}
        />
      )}
    />
  );
};
