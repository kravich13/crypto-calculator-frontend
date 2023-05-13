import { useAuthContext, useThemeContext } from '@cc/shared/lib';
import { Box, Modal, Typography, useTheme } from '@mui/material';
import React from 'react';
import styles from './styles/Modal.module.css';

export const ModalLogin: React.FC = () => {
  const { themeMode } = useThemeContext();
  const { showModalLogin } = useAuthContext();
  const { palette } = useTheme();

  return (
    <Modal open={showModalLogin}>
      <Box
        className={styles.container}
        style={{ background: themeMode === 'light' ? 'whitesmoke' : palette.grey['900'] }}
      >
        <Typography variant="h6" component="h2" color="green" fontWeight="600">
          You have successfully logged in
        </Typography>

        <Typography sx={{ mt: 2, color: palette.text.secondary }}>
          Within 3 seconds you will be redirected to the main page.
        </Typography>
      </Box>
    </Modal>
  );
};
