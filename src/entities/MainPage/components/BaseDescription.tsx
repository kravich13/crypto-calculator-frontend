import { Box, Typography } from '@mui/material';
import { Variants, motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import { useCallback } from 'react';
import styles from '../styles/BaseDescription.module.scss';

export const BaseDescription = () => {
  const { t } = useTranslation();

  const blockAnimation = useCallback(
    (blockPos: 'left' | 'right'): Variants => ({
      hidden: { opacity: 0, x: blockPos === 'left' ? -200 : 200 },
      visible: {
        opacity: 1,
        x: 0,
        transition: { delay: 2 * 0.2, duration: 1.13 },
      },
    }),
    []
  );

  return (
    <Box className={styles.container}>
      <motion.div
        variants={blockAnimation('left')}
        className={[styles.boxContent, styles.description].join(' ')}
      >
        <Typography>{t('cc.entity.baseDescription.firstDescription')}</Typography>

        <br />

        <Typography>{t('cc.entity.baseDescription.secondDescription')}</Typography>
        <br />

        <Typography>{t('cc.entity.baseDescription.thirdDescription')}</Typography>
      </motion.div>

      <motion.div variants={blockAnimation('right')} className={styles.boxContent}>
        <Typography>{t('cc.entity.baseDescription.tool.subtitle')}</Typography>

        <ul>
          <li>{t('cc.entity.baseDescription.tool.firstDescription')}</li>
          <li>{t('cc.entity.baseDescription.tool.secondDescription')}</li>
          <li>{t('cc.entity.baseDescription.tool.thirdDescription')}</li>
          <li>{t('cc.entity.baseDescription.tool.fourthDescription')}</li>
        </ul>
      </motion.div>
    </Box>
  );
};
