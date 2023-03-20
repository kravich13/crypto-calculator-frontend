import { BestWorstInvestment, InvestmentPercent } from '@cc/entities/Calculate';
import { useAppSelector } from '@cc/shared/lib';
import { Box, Typography } from '@mui/material';
import { useMemo } from 'react';
import styles from '../styles/GeneralInvestmentStatistics.module.css';

export const GeneralInvestmentStatistics = () => {
  const { investmentPeriod, totalCapital, totalGrowth, totalInvested, coins } = useAppSelector(
    ({ profitReducer }) => profitReducer
  );

  const { startDate, endDate, monthlyInvestment } = useAppSelector(
    ({ baseCalculatorReducer: { maxNumberOfCoinsToInvest, ...rest } }) => rest
  );

  const profit = Number((totalCapital - totalInvested).toFixed(2));
  const profitNumber = profit >= 0 ? profit : Math.abs(profit);
  const profitTitle = `${profit >= 0 ? '+' : '-'} $${profitNumber}`;
  const investmentPeriodTitle = `${investmentPeriod} month${investmentPeriod > 1 ? 's' : ''}`;

  const percentStyles = useMemo(
    () => ({
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
    <Box>
      <Typography component="h1" variant="h5" textAlign="center" mb={3}>
        General statistics
      </Typography>

      <Box mb={2}>
        <Typography>
          Investment period:
          <Typography component="span" fontWeight="600" fontStyle="italic">
            {` ${startDate} - ${endDate} `}
          </Typography>
          ({investmentPeriodTitle})
        </Typography>

        <Typography>
          Monthly investment
          <Typography component="span" fontWeight="600" fontStyle="italic">
            {` $${monthlyInvestment}`}
          </Typography>
        </Typography>
      </Box>

      <Box className={styles.profitContainer}>
        <Box>
          <Box className={styles.finalBalance}>
            <Typography color="GrayText" fontWeight="500" mr={1}>
              Invested
            </Typography>

            <Box className={styles.finalDataBox}>
              <Typography>${totalInvested}</Typography>

              <Typography style={profitStyles}>{profitTitle}</Typography>
            </Box>
          </Box>

          <Box className={styles.finalBalance}>
            <Typography color="GrayText" fontWeight="500" mr={1} width={{ width: 60 }}>
              Balance
            </Typography>

            <Box className={styles.finalDataBox}>
              <Typography>${totalCapital}</Typography>

              <InvestmentPercent percent={totalGrowth} textStyles={percentStyles} />
            </Box>
          </Box>
        </Box>

        {Boolean(coins.length) && <BestWorstInvestment coins={coins} />}
      </Box>
    </Box>
  );
};
