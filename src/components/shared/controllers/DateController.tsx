import { Input, TextField } from '@mui/material';
import React from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';

interface DateControllerProps {
  name: string;
  label: string;
  control: Control<any, any>;
  rules?: any;
  error?: FieldError;
  autoComplete?: string;
  minDate?: string;
  maxDate?: string;
  disabled?: boolean;
}

export const DateControlller: React.FC<DateControllerProps> = ({
  name,
  label,
  control,
  rules,
  error,
  autoComplete,
  minDate,
  maxDate,
  disabled,
}) => {
  return (
    <Controller
      defaultValue=""
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <TextField
          disabled={disabled}
          {...field}
          type="date"
          fullWidth
          required
          label={label}
          autoComplete={autoComplete}
          error={!!error}
          helperText={error?.message}
          InputLabelProps={{ shrink: true }}
          inputProps={{ min: minDate, max: maxDate }}
        />
      )}
    />
  );
};
