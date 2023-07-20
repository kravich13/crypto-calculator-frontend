import { Typography } from '@cc/shared/ui';
import { Box, Chip, Divider } from '@mui/material';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import LegacyImage from 'next/legacy/image';
import React from 'react';
import { baseYAnimation, imageScale } from '../lib/const';
import { ICalculateData } from '../types';

interface IResultsDescriptionProps extends ICalculateData {}

export const ResultsDescription: React.FC<IResultsDescriptionProps> = ({
  step,
  description,
  src,
}) => {
  const { t } = useTranslation();

  return (
    <Box>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={baseYAnimation}
      >
        <Divider>
          <Chip
            label={t('cc.entity.resultsDescription.stepTitle', { count: step })}
            variant="outlined"
            size="medium"
            color="primary"
            component="h2"
          />
        </Divider>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={baseYAnimation}
      >
        <Typography tint component="h2" variant="h6" textAlign="center" sx={{ mb: 2 }}>
          {description}
        </Typography>
      </motion.div>

      <motion.div
        {...imageScale}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={baseYAnimation}
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
  );
};
