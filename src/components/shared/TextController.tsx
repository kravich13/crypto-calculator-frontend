import React, { HTMLInputTypeAttribute } from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';
import { TextInput } from './TextInput';

interface TextControllerProps {
  inputType: HTMLInputTypeAttribute;
  name: string;
  label: string;
  control: Control<any, any>;
  rules: any;
  error: FieldError | undefined;
  autoComplete?: string;
  onClear: () => void;
}

export const TextController: React.FC<TextControllerProps> = ({
  inputType,
  name,
  label,
  control,
  rules,
  error,
  autoComplete,
  onClear,
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
          type={inputType}
          required
          fullWidth
          label={label}
          autoComplete={autoComplete}
          error={!!error}
          helperText={error?.message}
          onClearValue={onClear}
        />
      )}
    />
  );
};
