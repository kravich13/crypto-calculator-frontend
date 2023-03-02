import { BestWorstInvestment, InvestmentPercent } from '@cc/entities/Calculate';
import { useAppSelector } from '@cc/shared/lib';
import { Box, Typography } from '@mui/material';
import { useMemo } from 'react';
import styles from '../styles/GeneralInvestmentStatistics.module.css';

export const GeneralInvestmentStatistics = () => {
  const { investmentPeriod, totalCapital, totalGrowth, totalInvested, coins } = useAppSelector(
    ({ profitReducer }) => ({ ...profitReducer })
  );

  const { startDate, endDate, monthlyInvestment } = useAppSelector(
    ({ baseCalculatorReducer: { maxNumberOfCoinsToInvest, ...rest } }) => ({ ...rest })
  );

  const profit = Number((totalCapital - totalInvested).toFixed(2));
  const profitNumber = profit >= 0 ? profit : Math.abs(profit);
  const profitTitle = `${profit >= 0 ? '+' : '-'} $${profitNumber}`;
  const investmentPeriodTitle = `${investmentPeriod} month${investmentPeriod > 1 ? 's' : ''}`;

  const percentStyles = useMemo(
    () => ({
      marginLeft: '8px',
      paddingRight: '8px',
      paddingLeft: '2px',
      borderRadius: '8px',
      background: totalGrowth >= 0 ? '#16C784' : '#EA3943',
      color: 'white',
      fontWeight: 500,
    }),
    [totalGrowth]
  );

  const profitStyles = useMemo(
    () => ({
      color: profit >= 0 ? '#16C784' : '#EA3943',
      fontWeight: 600,
    }),
    [profit]
  );

  return (
    <>
      <Typography component="h1" variant="h5" textAlign="center" mb={3}>
        General statistics
      </Typography>

      <Box mb={2}>
        <Typography component="p" variant="h6">
          Your investment conditions
        </Typography>

        <Typography>
          Investment period from {startDate} to {endDate} ({investmentPeriodTitle})
        </Typography>

        <Typography>The monthly investment ${monthlyInvestment}</Typography>
      </Box>

      <Box mb={2}>
        <Typography component="p" variant="h6">
          Final balance
        </Typography>

        <Box className={styles.finalDataBox}>
          <Typography component="p" variant="h6">
            ${totalCapital}
          </Typography>

          <InvestmentPercent percent={totalGrowth} textStyles={percentStyles} />
        </Box>
      </Box>

      <Box mb={2}>
        <Typography component="p" variant="h6">
          Invested
        </Typography>

        <Typography component="p" variant="h6">
          ${totalInvested}
        </Typography>

        <Typography style={profitStyles}>{profitTitle}</Typography>
      </Box>

      <Box mb={2}>
        <Typography component="p" variant="h6" mb={1}>
          Best/worst investment
        </Typography>

        {Boolean(coins.length) && <BestWorstInvestment coins={coins} />}
      </Box>
    </>
  );
};
