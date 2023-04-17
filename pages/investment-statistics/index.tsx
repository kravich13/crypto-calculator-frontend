import { AuthPage, PageLayout, ProtectedPage } from '@cc/app/components';
import { Chart, DetailedInvestmentStatistics, GeneralInvestmentStatistics } from '@cc/features';
import { RoutesTypes } from '@cc/shared/enums';
import { useAppSelector } from '@cc/shared/lib';
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

  return (
    <AuthPage>
      <ProtectedPage redirectTo={RoutesTypes.CALCULATE_YIELD} condition={Boolean(!hasProfitData)}>
        <PageLayout>
          <Head>
            <title>Investment statistics | Crypto Metrics</title>
            <meta name="description" content="Generated by create next app" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
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
      </ProtectedPage>
    </AuthPage>
  );
}
