import sharedStyles from '@cc/shared/styles/Index.module.css';
import { Box, Typography, useTheme } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import styles from '../styles/MainCoinInfoContainer.module.css';

interface IMainCoinInfoContainerProps {
  name: string;
  symbol: string;
  image: string;
  imageWidth?: number;
  imageHeight?: number;
}

export const MainCoinInfoContainer: React.FC<IMainCoinInfoContainerProps> = ({
  name,
  symbol,
  image,
  imageHeight = 20,
  imageWidth = 20,
}) => {
  const { palette } = useTheme();
  const symbolTitle = symbol.toUpperCase();

  return (
    <Box className={styles.container}>
      <Image
        loader={({}) => image}
        src={image}
        alt="Image"
        width={imageWidth}
        height={imageHeight}
        unoptimized
        className={sharedStyles.coinIcon}
      />

      <Typography className={styles.nameText} title={name}>
        {name}
      </Typography>

      <Typography style={{ color: palette.text.secondary }} title={symbolTitle}>
        {symbolTitle}
      </Typography>
    </Box>
  );
};
