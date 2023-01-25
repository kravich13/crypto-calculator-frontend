import { Close } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField, TextFieldProps } from '@mui/material';
import React, { FC } from 'react';

interface ITextInputProps {
  onClearValue?: () => void;
}

export type TextInputProps = TextFieldProps & ITextInputProps;

export const TextInput: FC<TextInputProps> = React.forwardRef((props, inputRef) => {
  const { type, onClearValue, InputProps, ...textFieldProps } = props;

  return (
    <TextField
      inputRef={inputRef}
      type={type || 'text'}
      InputProps={{
        ...InputProps,
        endAdornment: Boolean(onClearValue) && (
          <InputAdornment position="end">
            <IconButton onClick={onClearValue} edge="end">
              {!!props.value && <Close />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...textFieldProps}
    />
  );
});
