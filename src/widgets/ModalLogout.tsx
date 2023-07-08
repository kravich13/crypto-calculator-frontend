import { useAuthContext, useThemeContext } from '@cc/shared/lib';
import { Box, Modal, Typography, useTheme } from '@mui/material';
import React from 'react';
import styles from './styles/Modal.module.scss';
import { useTranslation } from 'next-i18next';

export const ModalLogout: React.FC = () => {
  const { themeMode } = useThemeContext();
  const { showModalLogout } = useAuthContext();
  const { palette } = useTheme();
  const { t } = useTranslation();

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
          {t('cc.widget.modalLogout.title')}
        </Typography>

        <Typography sx={{ mt: 2, color: palette.text.secondary }}>
          {t('cc.widget.modalLogout.description')}
        </Typography>
      </Box>
    </Modal>
  );
};
