import { CalculateCoinProfitData } from '@cc/shared/types';
import { Box } from '@mui/material';
import React, { useCallback, useMemo } from 'react';
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

  const getBestWorstCoin = useCallback(
    ({ image, growth, name, symbol }: CalculateCoinProfitData, profit: number) => ({
      image,
      growth,
      name,
      symbol,
      profit,
    }),
    []
  );

  return (
    <Box className={styles.container}>
      <Box sx={{ mr: 4 }}>
        <BestWorstItem coin={getBestWorstCoin(maxCoin, maxProfit)} isMaxCoin={true} />
      </Box>

      <BestWorstItem coin={getBestWorstCoin(minCoin, minProfit)} isMaxCoin={false} />
    </Box>
  );
};
