import { useAuthContext, useThemeContext } from '@cc/shared/lib';
import { Box, Modal, Typography, useTheme } from '@mui/material';
import React from 'react';
import styles from './styles/Modal.module.scss';

export const ModalLogout: React.FC = () => {
  const { themeMode } = useThemeContext();
  const { showModalLogout } = useAuthContext();
  const { palette } = useTheme();

  return (
    <Modal open={showModalLogout}>
      <Box
        className={styles.container}
        style={{ background: themeMode === 'light' ? 'whitesmoke' : palette.grey['900'] }}
      >
        <Typography
          variant="h6"
          component="h2"
          fontWeight="600"
          style={{ color: palette.error.dark }}
        >
          Authorization timed out
        </Typography>

        <Typography sx={{ mt: 2, color: palette.text.secondary }}>
          Within 3 seconds you will be redirected to the main page.
        </Typography>
      </Box>
    </Modal>
  );
};
