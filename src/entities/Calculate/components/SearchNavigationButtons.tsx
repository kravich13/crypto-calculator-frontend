import variables from '@cc/shared/styles/Variables.module.scss';
import { Box, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'next-i18next';
import React, { memo } from 'react';
import styles from '../styles/SearchNavigationButtons.module.scss';

export const SearchNavigationButtons: React.FC = memo(() => {
  const { palette } = useTheme();
  const { t } = useTranslation();

  const buttonsProps = {
    fontSize: 'small',
    color: variables.primaryLight,
  };

  return (
    <Box className={styles.container}>
      <Box className={styles.containerNavigate} justifyContent="flex-start" width="40%">
        <Box {...buttonsProps} className={styles.button}>
          ↑
        </Box>

        <Box {...buttonsProps} className={styles.button}>
          ↓
        </Box>

        <Typography fontSize="small" style={{ color: palette.text.secondary }} noWrap>
          {t('cc.entity.searchNavigationButtons.navigate')}
        </Typography>
      </Box>

      <Box className={styles.containerNavigate} justifyContent="center" width="35%">
        <Box {...buttonsProps} className={styles.button}>
          ESC
        </Box>

        <Typography fontSize="small" style={{ color: palette.text.secondary }} noWrap>
          {t('cc.entity.searchNavigationButtons.cancel')}
        </Typography>
      </Box>

      <Box className={styles.containerNavigate} justifyContent="flex-end" width="25%">
        <Box {...buttonsProps} className={styles.button}>
          ↵
        </Box>

        <Typography fontSize="small" style={{ color: palette.text.secondary }} noWrap>
          {t('cc.entity.searchNavigationButtons.enter')}
        </Typography>
      </Box>
    </Box>
  );
});
