import { useAuthContext, useThemeContext } from '@cc/shared/lib';
import { Box, Modal, Typography, useTheme } from '@mui/material';
import React from 'react';
import styles from './styles/Modal.module.scss';
import { useTranslation } from 'next-i18next';

export const ModalLogin: React.FC = () => {
  const { themeMode } = useThemeContext();
  const { showModalLogin } = useAuthContext();
  const { palette } = useTheme();
  const { t } = useTranslation();

  return (
    <Modal open={showModalLogin}>
      <Box
        className={styles.container}
        style={{ background: themeMode === 'light' ? 'whitesmoke' : palette.grey['900'] }}
      >
        <Typography variant="h6" component="h2" color="green" fontWeight="600">
          {t('cc.widget.modalLogin.title')}
        </Typography>

        <Typography sx={{ mt: 2, color: palette.text.secondary }}>
          {t('cc.widget.modalLogin.description')}
        </Typography>
      </Box>
    </Modal>
  );
};
