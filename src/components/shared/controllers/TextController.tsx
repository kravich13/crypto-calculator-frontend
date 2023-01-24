import React from 'react';
import { Controller, FieldValues } from 'react-hook-form';
import { TextInput, TextInputProps } from './TextInput';

type TextControllerProps = {
  controllerProps: FieldValues;
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
