import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { TextInput, TextInputProps } from './TextInput';

type TextControllerProps = {
  controllerProps: {
    name: string;
    control: Control<any, any>;
    rules?: any;
  };
  inputProps: TextInputProps;
};

export const TextController: React.FC<TextControllerProps> = ({
  controllerProps: { control, name, rules },
  inputProps,
}) => (
  <Controller
    defaultValue=""
    name={name}
    control={control}
    rules={rules}
    render={({ field }) => <TextInput {...field} {...inputProps} />}
  />
);
