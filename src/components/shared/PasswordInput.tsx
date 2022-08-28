import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField, TextFieldProps } from '@mui/material';
import React, { FC, useCallback, useState } from 'react';

export const PasswordInput: FC<TextFieldProps> = React.forwardRef((props, ref) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleClickShowPassword = useCallback(() => {
    setIsShowPassword(!isShowPassword);
  }, [isShowPassword]);

  const handleMouseDownPassword = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  }, []);

  return (
    <TextField
      ref={ref}
      label="Password"
      type={isShowPassword ? 'text' : 'password'}
      autoComplete="current-password"
      {...props}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {isShowPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
});
