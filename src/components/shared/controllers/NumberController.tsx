import { InputAdornment, TextField } from '@mui/material';
import React from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';

interface NumberControllerProps {
  name: string;
  label: string;
  control: Control<any, any>;
  rules?: any;
  error?: FieldError;
  min?: number;
  max?: number;
}

export const NumberController: React.FC<NumberControllerProps> = ({
  control,
  label,
  name,
  rules,
  error,
  min,
  max,
}) => {
  return (
    <Controller
      defaultValue=""
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <TextField
          {...field}
          type="number"
          required
          fullWidth
          label={label}
          error={!!error}
          helperText={error?.message}
          InputLabelProps={{ shrink: true }}
          InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
          inputProps={{ min, max }}
        />
      )}
    />
  );
};
