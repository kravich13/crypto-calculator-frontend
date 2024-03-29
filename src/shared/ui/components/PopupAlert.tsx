import { Alert, AlertColor, Snackbar } from '@mui/material';
import { FC, useCallback, useState } from 'react';

interface IPopupAlert {
  text: string;
  severity: AlertColor;
  variant?: 'filled' | 'outlined' | 'standard';
  autoHideDuration?: number;
}

export const PopupAlert: FC<IPopupAlert> = ({ severity, variant, text, autoHideDuration }) => {
  const [isOpen, setOpen] = useState(true);

  const onClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={autoHideDuration || 7000}
      onClose={onClose}
      transitionDuration={600}
      anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
    >
      <Alert onClose={onClose} severity={severity} variant={variant} sx={{ width: '500px' }}>
        {text}
      </Alert>
    </Snackbar>
  );
};
