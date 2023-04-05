import { Box, Chip, Divider, Typography } from '@mui/material';
import LegacyImage from 'next/legacy/image';
import step4Image from '../../../../public/main-page-images/step-4.jpg';
import step5Image from '../../../../public/main-page-images/step-5.jpg';

export const ResultsDescription = () => {
  return (
    <Box>
      <Divider>
        <Chip label="STEP 4" variant="outlined" size="medium" color="primary" component="h2" />
      </Divider>

      <Typography component="h2" variant="h6" textAlign="center" sx={{ mb: 2 }}>
        Get your general results
      </Typography>

      <LegacyImage
        src={step4Image}
        alt="Step-4"
        objectFit="contain"
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z/C/HgAGgwJ/lK3Q6wAAAABJRU5ErkJggg=="
        style={{ borderRadius: 8 }}
      />

      <Divider>
        <Chip label="STEP 5" variant="outlined" size="medium" color="primary" component="h2" />
      </Divider>

      <Typography component="h2" variant="h6" textAlign="center" sx={{ mb: 2 }}>
        Get your detailed results
      </Typography>

      <LegacyImage
        src={step5Image}
        alt="Step-5"
        objectFit="contain"
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z/C/HgAGgwJ/lK3Q6wAAAABJRU5ErkJggg=="
        style={{ borderRadius: 8 }}
      />
    </Box>
  );
};
