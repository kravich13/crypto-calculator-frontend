import { Box, Typography } from '@mui/material';
import React from 'react';
import Image from 'next/image';
import styles from '../styles/MainCoinInfoContainer.module.css';

interface IMainCoinInfoContainerProps {
  name: string;
  symbol: string;
  image: string;
}

export const MainCoinInfoContainer: React.FC<IMainCoinInfoContainerProps> = ({
  name,
  symbol,
  image,
}) => (
  <Box className={styles.container}>
    <Image loader={({}) => image} src={image} alt="Image" width={20} height={20} unoptimized />

    <Typography className={styles.nameText}>{name}</Typography>

    <Typography color="GrayText">{symbol.toUpperCase()}</Typography>
  </Box>
);
