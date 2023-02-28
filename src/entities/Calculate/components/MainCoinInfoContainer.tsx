import { Box, Typography } from '@mui/material';
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
}) => (
  <Box className={styles.container}>
    <Image
      loader={({}) => image}
      src={image}
      alt="Image"
      width={imageWidth}
      height={imageHeight}
      unoptimized
    />

    <Typography className={styles.nameText}>{name}</Typography>

    <Typography color="GrayText">{symbol.toUpperCase()}</Typography>
  </Box>
);
