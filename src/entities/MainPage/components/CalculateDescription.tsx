import { Box, Chip, Container, Divider, Typography } from '@mui/material';
import LegacyImage from 'next/legacy/image';
import { useMemo } from 'react';
import styles from '../styles/CalculateDescription.module.css';
import { ICalculateData } from '../types';

interface ICalculateDescriptionProps extends ICalculateData {}

export const CalculateDescription: React.FC<ICalculateDescriptionProps> = ({
  step,
  description,
  src,
  position,
}) => {
  const descriptionRender = useMemo(() => <Typography>{description}</Typography>, [description]);

  const boxImageRender = useMemo(
    () => (
      <LegacyImage
        src={src}
        alt={`Step-${step}`}
        objectFit="contain"
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z/C/HgAGgwJ/lK3Q6wAAAABJRU5ErkJggg=="
        className={styles.image}
      />
    ),
    [src, step]
  );

  return (
    <Container maxWidth="lg" className={styles.mainContainer}>
      <Divider sx={{ mb: 1 }}>
        <Chip
          label={`STEP ${step}`}
          variant="outlined"
          size="medium"
          color="primary"
          component="h2"
        />
      </Divider>

      <Box className={styles.contentContainer}>
        <Box className={styles.boxContent} sx={{ mr: 10 }}>
          {position === 'left' ? descriptionRender : boxImageRender}
        </Box>

        <Box className={styles.boxContent}>
          {position === 'left' ? boxImageRender : descriptionRender}
        </Box>
      </Box>
    </Container>
  );
};
