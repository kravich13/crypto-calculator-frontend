import { useThemeContext } from '@cc/shared/lib';
import sharedStyles from '@cc/shared/styles/Index.module.scss';
import { getBlurDataUrl } from '@cc/shared/utils';
import { Box, Typography, useTheme } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import styles from '../styles/MainCoinInfoContainer.module.scss';

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
  const { themeMode } = useThemeContext();

  const symbolTitle = symbol.toUpperCase();

  return (
    <Box className={styles.container}>
      <Image
        placeholder="blur"
        blurDataURL={getBlurDataUrl(themeMode)}
        src={image}
        alt={`${name}-image`}
        width={imageWidth}
        height={imageHeight}
        unoptimized
        className={sharedStyles.coinIcon}
      />

      <Box className={styles.nameContainer}>
        <Typography className={styles.nameText} title={name}>
          {name}
        </Typography>
      </Box>

      <Typography style={{ color: palette.text.secondary }} title={symbolTitle}>
        {symbolTitle}
      </Typography>
    </Box>
  );
};
