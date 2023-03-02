import { PageLayout } from '@cc/app/components';
import { DetailedInvestmentStatistics, GeneralInvestmentStatistics } from '@cc/features';
import { RoutesTypes } from '@cc/shared/enums';
import { useAppSelector, useAuthPage, useRedirectCondition } from '@cc/shared/lib';
import { Box, Container } from '@mui/material';
import Head from 'next/head';

export default function InvestmentStatistics() {
  const hasProfitData = useAppSelector(({ profitReducer: { hasData } }) => hasData);

  const { showContent } = useAuthPage({ redirectTo: RoutesTypes.MAIN });
  useRedirectCondition({ redirectTo: RoutesTypes.CALCULATE_YIELD, condition: !hasProfitData });

  return (
    <PageLayout>
      <Head>
        <title>Calculator | Investment statistics</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {showContent && hasProfitData && (
        <Container maxWidth="md">
          <Box mb={3}>
            <GeneralInvestmentStatistics />
          </Box>

          <DetailedInvestmentStatistics />
        </Container>
      )}
    </PageLayout>
  );
}
