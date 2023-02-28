import { CalculateCoinProfitData } from '@cc/shared/types';
import { Box } from '@mui/material';
import React, { useMemo } from 'react';
import { BestWorstItem } from './BestWorstItem';
import styles from '../styles/BestWorstInvestment.module.css';

interface IBestWorstInvestmentProps {
  coins: CalculateCoinProfitData[];
}

export const BestWorstInvestment: React.FC<IBestWorstInvestmentProps> = ({ coins }) => {
  const coinsCapital = useMemo(() => coins.map(({ capital }) => capital), [coins]);

  const maxCapital = Math.max(...coinsCapital);
  const minCapital = Math.min(...coinsCapital);

  const maxCoin = coins.find(({ capital }) => maxCapital === capital)!;
  const minCoin = coins.find(({ capital }) => minCapital === capital)!;

  const maxProfit = Number((maxCoin.capital - maxCoin.invested).toFixed(2));
  const minProfit = Number((minCoin.capital - minCoin.invested).toFixed(2));

  return (
    <Box className={styles.container}>
      <Box sx={{ mr: 4 }}>
        <BestWorstItem
          coin={{ growth: maxCoin.growth, image: maxCoin.image, profit: maxProfit }}
          isMaxCoin={true}
        />
      </Box>

      <BestWorstItem
        coin={{ growth: minCoin.growth, image: minCoin.image, profit: minProfit }}
        isMaxCoin={false}
      />
    </Box>
  );
};
