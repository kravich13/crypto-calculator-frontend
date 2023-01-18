import { Close } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField, TextFieldProps } from '@mui/material';
import React, { FC } from 'react';

interface ITextInputProps {
  onClearValue?: () => void;
}

export const TextInput: FC<ITextInputProps & TextFieldProps> = React.forwardRef(
  (props, inputRef) => {
    const { onClearValue, InputProps, ...textFieldProps } = props;

    return (
      <TextField
        inputRef={inputRef}
        type="text"
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
  }
);
