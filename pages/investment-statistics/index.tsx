import { PageLayout } from '@cc/app/components';
import { Chart, DetailedInvestmentStatistics, GeneralInvestmentStatistics } from '@cc/features';
import { RoutesTypes } from '@cc/shared/enums';
import { useAppSelector, useAuthPage, useRedirectCondition } from '@cc/shared/lib';
import globalStyles from '@cc/shared/styles/Index.module.css';
import { Box, Container, Divider } from '@mui/material';
import Head from 'next/head';

export default function InvestmentStatistics() {
  const hasProfitData = useAppSelector(({ profitReducer: { hasData } }) => hasData);
  const monthlyCapitals = useAppSelector(
    ({ profitReducer: { monthlyCapitals } }) => monthlyCapitals
  );

  const capitalsProfit = monthlyCapitals.map(({ capital }) => capital);
  const capitalsDate = monthlyCapitals.map(({ date }) => date);

  useAuthPage({ redirectTo: RoutesTypes.MAIN });
  useRedirectCondition({ redirectTo: RoutesTypes.CALCULATE_YIELD, condition: !hasProfitData });

  return (
    <PageLayout>
      <Head>
        <title>Calculator | Investment statistics</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {hasProfitData && (
        <Container maxWidth="lg" className={globalStyles.contentPageContainer}>
          <Box mb={3} display="flex" justifyContent="center">
            <GeneralInvestmentStatistics />
          </Box>

          <Box mb={3}>
            <Chart dollars={capitalsProfit} labels={capitalsDate} />
          </Box>

          <Divider variant="fullWidth" style={{ marginBottom: 20 }} />

          <DetailedInvestmentStatistics />
        </Container>
      )}
    </PageLayout>
  );
}
