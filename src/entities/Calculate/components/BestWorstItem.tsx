import { useThemeContext } from '@cc/shared/lib';
import sharedStyles from '@cc/shared/styles/Index.module.scss';
import variables from '@cc/shared/styles/Variables.module.scss';
import { getBlurDataUrl } from '@cc/shared/utils';
import { Box, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import React, { useMemo } from 'react';
import styles from '../styles/BestWorstItem.module.scss';
import { InvestmentPercent } from './InvestmentPercent';

interface IBestWorstInvestmentProps {
  isMaxCoin: boolean;
  coin: {
    image: string;
    profit: number;
    growth: number;
    name: string;
    symbol: string;
  };
}

export const BestWorstItem: React.FC<IBestWorstInvestmentProps> = ({
  coin: { image, growth, profit, name, symbol },
  isMaxCoin,
}) => {
  const { palette } = useTheme();
  const { t } = useTranslation();
  const { themeMode } = useThemeContext();

  const profitNumber = profit >= 0 ? profit : Math.abs(profit);
  const profitTitle = `${profit >= 0 ? '+' : '-'} $${profitNumber}`;

  const profitTextStyle = useMemo(
    () => ({
      color: growth >= 0 ? variables.profit : variables.loss,
      fontSize: 16,
      fontWeight: 600,
    }),
    [growth]
  );

  return (
    <Box className={styles.container}>
      <Image
        alt={`${name}-image`}
        src={image}
        placeholder="blur"
        blurDataURL={getBlurDataUrl(themeMode)}
        height={24}
        width={24}
        unoptimized
        title={`${name} (${symbol.toUpperCase()})`}
        className={sharedStyles.coinIcon}
      />

      <Box className={styles.titlesContainer}>
        <Typography fontWeight="500" width={80} style={{ color: palette.text.secondary }}>
          {t(`cc.entity.bestWorstItem.title.${isMaxCoin ? 'best' : 'worst'}`)}
        </Typography>

        <Box className={styles.container}>
          <InvestmentPercent percent={growth} textStyles={profitTextStyle} />

          <Typography style={profitTextStyle}>({profitTitle}) </Typography>
        </Box>
      </Box>
    </Box>
  );
};
