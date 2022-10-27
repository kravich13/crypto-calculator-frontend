import { Close } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField, TextFieldProps } from '@mui/material';
import React, { FC } from 'react';

interface ITextInputProps {
  onClearValue: () => void;
}

export const TextInput: FC<ITextInputProps & TextFieldProps> = React.forwardRef((props, ref) => {
  const { onClearValue, ...textFieldProps } = props;

  return (
    <TextField
      ref={ref}
      type={'text'}
      {...textFieldProps}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={props.onClearValue} edge="end">
              {!!props.value && <Close />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
});
