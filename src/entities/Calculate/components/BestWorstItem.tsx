import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import React, { useMemo } from 'react';
import styles from '../styles/BestWorstItem.module.css';
import { InvestmentPercent } from './InvestmentPercent';

interface IBestWorstInvestmentProps {
  isMaxCoin: boolean;
  coin: { image: string; profit: number; growth: number };
}

export const BestWorstItem: React.FC<IBestWorstInvestmentProps> = ({
  coin: { image, growth, profit },
  isMaxCoin,
}) => {
  const profitNumber = profit >= 0 ? profit : Math.abs(profit);
  const profitTitle = `${profit >= 0 ? '+' : '-'} $${profitNumber}`;

  const profitTextStyle = useMemo(
    () => ({ color: growth >= 0 ? '#16C784' : '#EA3943', fontSize: 16 }),
    [growth]
  );

  return (
    <Box className={styles.container}>
      <Image loader={() => image} alt="Image" src={image} height={24} width={24} unoptimized />

      <Box sx={{ ml: 1 }}>
        <Typography color="GrayText">{isMaxCoin ? 'Best' : 'Worst'}</Typography>

        <Box className={styles.container}>
          <InvestmentPercent percent={growth} textStyles={profitTextStyle} />

          <Typography style={profitTextStyle}>({profitTitle}) </Typography>
        </Box>
      </Box>
    </Box>
  );
};
