import { Typography } from '@cc/shared/ui';
import { Box, Chip, Divider } from '@mui/material';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import LegacyImage from 'next/legacy/image';
import { useCallback } from 'react';
import { baseTansitionParams, baseYAnimation, imageScale } from '../lib/const';
import styles from '../styles/CalculateDescription.module.scss';
import { ICalculateData } from '../types';

interface ICalculateDescriptionProps extends ICalculateData {}

export const CalculateDescription: React.FC<ICalculateDescriptionProps> = ({
  step,
  description,
  src,
}) => {
  const { t } = useTranslation();

  const otherAnimation = useCallback(
    (position: 'left' | 'right') => ({
      hidden: { opacity: 0, x: position === 'left' ? -200 : 200 },
      visible: {
        opacity: 1,
        x: 0,
        transition: baseTansitionParams,
      },
    }),
    []
  );

  return (
    <Box className={styles.mainContainer} sx={{ mb: 3 }}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={baseYAnimation}
      >
        <Divider className={styles.divider}>
          <Chip
            label={t('cc.entity.calculateDescription.stepTitle', { count: step })}
            variant="outlined"
            size="medium"
            color="primary"
            component="h2"
          />
        </Divider>
      </motion.div>

      <Box className={styles.contentContainer}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={otherAnimation(step % 2 === 0 ? 'left' : 'right')}
          className={styles.boxContent}
        >
          <Typography tint component="h2" variant="h6">
            {description}
          </Typography>
        </motion.div>

        <motion.div
          {...imageScale}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={otherAnimation(step % 2 === 0 ? 'right' : 'left')}
          className={styles.boxContent}
        >
          <LegacyImage
            src={src}
            alt={`Step-${step}`}
            objectFit="contain"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z/C/HgAGgwJ/lK3Q6wAAAABJRU5ErkJggg=="
            style={{ borderRadius: 8 }}
          />
        </motion.div>
      </Box>
    </Box>
  );
};
