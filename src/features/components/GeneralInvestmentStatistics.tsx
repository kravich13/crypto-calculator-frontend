import { BestWorstInvestment, InvestmentPercent } from '@cc/entities/Calculate';
import { useAppSelector } from '@cc/shared/lib';
import variables from '@cc/shared/styles/Variables.module.scss';
import { Box, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useMemo } from 'react';
import styles from '../styles/GeneralInvestmentStatistics.module.scss';

export const GeneralInvestmentStatistics = () => {
  const { palette } = useTheme();
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const { investmentPeriod, totalCapital, totalGrowth, totalInvested, coins } = useAppSelector(
    ({ profitReducer }) => profitReducer
  );

  const { startDate, endDate, monthlyInvestment } = useAppSelector(
    ({ baseCalculatorReducer: { maxNumberOfCoinsToInvest, ...rest } }) => rest
  );

  const profit = Number((totalCapital - totalInvested).toFixed(2));
  const profitNumber = profit >= 0 ? profit : Math.abs(profit);
  const profitTitle = `${profit >= 0 ? '+' : '-'} $${profitNumber}`;

  const investmentPeriodTitle = useMemo(() => {
    let key = 'сс.feature.generalInvestmentStatictics.month';

    if (language === 'ua') {
      if (investmentPeriod >= 2 && investmentPeriod <= 4) {
        key += 's';
      } else if (investmentPeriod >= 5) {
        key += 's_plural';
      }
    } else if (language === 'en' && investmentPeriod > 1) {
      key += 's';
    }

    return t(key, { count: investmentPeriod });
  }, [investmentPeriod, language, t]);

  const percentStyles = useMemo(
    () => ({
      paddingRight: '8px',
      paddingLeft: '2px',
      borderRadius: '8px',
      background: totalGrowth >= 0 ? variables.profit : variables.loss,
      color: 'white',
      fontWeight: 500,
    }),
    [totalGrowth]
  );

  const profitStyles = useMemo(
    () => ({
      color: profit >= 0 ? variables.profit : variables.loss,
      fontWeight: 600,
    }),
    [profit]
  );

  return (
    <Box>
      <Typography component="h1" variant="h5" textAlign="center" mb={3}>
        {t('сс.feature.generalInvestmentStatictics.title')}
      </Typography>

      <Box mb={2}>
        <Typography>
          {t('сс.feature.generalInvestmentStatictics.description.investmentPeriod')}
          <Typography component="span" fontWeight="600" fontStyle="italic">
            {` ${startDate} - ${endDate} `}
          </Typography>
          ({investmentPeriodTitle})
        </Typography>

        <Typography>
          {t('сс.feature.generalInvestmentStatictics.description.monthlyInvestment')}
          <Typography component="span" fontWeight="600" fontStyle="italic">
            {` $${monthlyInvestment}`}
          </Typography>
        </Typography>
      </Box>

      <Box className={styles.profitContainer}>
        <Box>
          <Box className={styles.finalBalance}>
            <Box>
              <Typography
                fontWeight="500"
                mr={1}
                style={{ width: 100, color: palette.text.secondary }}
              >
                {t('сс.feature.generalInvestmentStatictics.description.invested')}
              </Typography>
            </Box>

            <Box className={styles.finalDataBox}>
              <Typography>${totalInvested}</Typography>

              <Typography style={profitStyles}>{profitTitle}</Typography>
            </Box>
          </Box>

          <Box className={styles.finalBalance}>
            <Typography
              fontWeight="500"
              mr={1}
              style={{ width: 100, color: palette.text.secondary }}
            >
              {t('сс.feature.generalInvestmentStatictics.description.balance')}
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
