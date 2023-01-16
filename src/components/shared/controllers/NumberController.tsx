import { InputAdornment } from '@mui/material';
import React from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';
import { TextInput } from './TextInput';

interface NumberControllerProps {
  name: string;
  label: string;
  control: Control<any, any>;
  rules?: any;
  error?: FieldError;
  autoComplete?: string;
}

export const NumberController: React.FC<NumberControllerProps> = ({
  control,
  label,
  name,
  autoComplete,
  error,
  rules,
}) => {
  return (
    <Controller
      defaultValue=""
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <TextInput
          {...field}
          type="number"
          required
          fullWidth
          label={label}
          autoComplete={autoComplete}
          error={!!error}
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
      )}
    />
  );
};
