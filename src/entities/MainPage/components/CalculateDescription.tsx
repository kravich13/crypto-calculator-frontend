import { Typography } from '@cc/shared/ui';
import { Box, Chip, Divider, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { useCallback } from 'react';
import { baseTansitionParams, baseYAnimation, imageScale } from '../lib/const';
import styles from '../styles/CalculateDescription.module.scss';
import sharedStyles from '../styles/Shared.module.scss';
import { ICalculateData } from '../types';

interface ICalculateDescriptionProps extends ICalculateData {}

export const CalculateDescription: React.FC<ICalculateDescriptionProps> = ({
  step,
  description,
  src,
}) => {
  const isMax1070Width = useMediaQuery('(max-width:1070px)');
  const { t } = useTranslation();

  const animationX = useCallback(
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
          variants={isMax1070Width ? baseYAnimation : animationX(step % 2 === 0 ? 'left' : 'right')}
          className={styles.textContainer}
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
          variants={isMax1070Width ? baseYAnimation : animationX(step % 2 === 0 ? 'right' : 'left')}
          className={styles.imageContainer}
        >
          <Image
            alt={`Step-${step}-image`}
            src={src}
            placeholder="blur"
            sizes="100vw"
            className={sharedStyles.image}
          />
        </motion.div>
      </Box>
    </Box>
  );
};
