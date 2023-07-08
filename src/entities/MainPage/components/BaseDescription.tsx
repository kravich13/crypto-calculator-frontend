import { Box, Typography } from '@mui/material';
import styles from '../styles/BaseDescription.module.scss';
import { useTranslation } from 'next-i18next';

export const BaseDescription = () => {
  const { t } = useTranslation();

  return (
    <Box className={styles.container}>
      <Box className={[styles.boxContent, styles.description].join(' ')}>
        <Typography>{t('cc.entity.baseDescription.firstDescription')}</Typography>

        <br />

        <Typography>{t('cc.entity.baseDescription.secondDescription')}</Typography>

        <br />

        <Typography>{t('cc.entity.baseDescription.thirdDescription')}</Typography>
      </Box>

      <Box className={styles.boxContent}>
        <Typography>{t('cc.entity.baseDescription.tool.subtitle')}</Typography>

        <ul>
          <li>{t('cc.entity.baseDescription.tool.firstDescription')}</li>
          <li>{t('cc.entity.baseDescription.tool.secondDescription')}</li>
          <li>{t('cc.entity.baseDescription.tool.thirdDescription')}</li>
          <li>{t('cc.entity.baseDescription.tool.fourthDescription')}</li>
        </ul>
      </Box>
    </Box>
  );
};
