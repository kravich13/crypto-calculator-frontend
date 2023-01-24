import { InputAdornment, TextField, TextFieldProps } from '@mui/material';
import { Controller, FieldValues } from 'react-hook-form';

type NumberControllerProps<T> = {
  controllerProps: T;
  inputProps: TextFieldProps;
  componentProps: {
    min?: number;
    max?: number;
    startAdornmentSymbol?: string;
  };
};

export const NumberController = <T extends FieldValues>({
  controllerProps: { control, name, rules, defaultValue },
  componentProps,
  inputProps,
}: NumberControllerProps<T>) => {
  const { InputLabelProps, InputProps, type, ...otherInputProps } = inputProps;

  return (
    <Controller
      defaultValue={defaultValue}
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <TextField
          {...field}
          type="number"
          InputLabelProps={{ shrink: true }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {componentProps?.startAdornmentSymbol}
              </InputAdornment>
            ),
          }}
          inputProps={{ min: componentProps?.min, max: componentProps?.max }}
          {...otherInputProps}
        />
      )}
    />
  );
};
