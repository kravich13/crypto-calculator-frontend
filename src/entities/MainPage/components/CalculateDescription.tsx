import { Box, Chip, Divider, Typography } from '@mui/material';
import LegacyImage from 'next/legacy/image';
import styles from '../styles/CalculateDescription.module.scss';
import { ICalculateData } from '../types';
import { useTranslation } from 'next-i18next';

interface ICalculateDescriptionProps extends ICalculateData {}

export const CalculateDescription: React.FC<ICalculateDescriptionProps> = ({
  step,
  description,
  src,
}) => {
  const { t } = useTranslation();

  return (
    <Box className={styles.mainContainer} sx={{ mb: 3 }}>
      <Divider className={styles.divider}>
        <Chip
          label={t('cc.entity.calculateDescription.stepTitle', { count: step })}
          variant="outlined"
          size="medium"
          color="primary"
          component="h2"
        />
      </Divider>

      <Box className={styles.contentContainer}>
        <Box className={styles.boxContent}>
          <Typography component="h2" variant="h6">
            {description}
          </Typography>
        </Box>

        <Box className={styles.boxContent}>
          <LegacyImage
            src={src}
            alt={`Step-${step}`}
            objectFit="contain"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z/C/HgAGgwJ/lK3Q6wAAAABJRU5ErkJggg=="
            style={{ borderRadius: 8 }}
          />
        </Box>
      </Box>
    </Box>
  );
};
