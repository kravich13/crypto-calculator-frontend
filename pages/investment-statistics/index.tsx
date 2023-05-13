import { AuthPage, PageLayout, ProtectedPage } from '@cc/app/components';
import { Chart, DetailedInvestmentStatistics, GeneralInvestmentStatistics } from '@cc/features';
import { KEY_WORDS_SEO } from '@cc/shared/const';
import { RoutesTypes } from '@cc/shared/enums';
import { useAppSelector } from '@cc/shared/lib';
import { LayoutContent, ScrollTopButton } from '@cc/shared/ui';
import { Box, Divider } from '@mui/material';
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
            <meta name="viewport" content="width=device-width, initial-scale=1" />

            <meta
              name="description"
              content="Use our crypto investment calculator to determine your potential earnings based on your initial investment, investment duration, and cryptocurrency allocation. Our smart search feature allows you to easily add up to 5 coins to your portfolio."
            />
            <meta
              name="keywords"
              content={`${KEY_WORDS_SEO}, monthly earnings, initial investment, investment duration, cryptocurrency allocation, portfolio`}
            />
            <meta name="robots" content="noindex, nofollow" />
          </Head>

          <LayoutContent containerStyles={{ maxWidth: 'lg' }}>
            <Box mb={3} display="flex" justifyContent="center">
              <GeneralInvestmentStatistics />
            </Box>

            <Box mb={3}>
              <Chart dollars={capitalsProfit} labels={capitalsDate} />
            </Box>

            <Divider variant="fullWidth" style={{ marginBottom: 20 }} />

            <DetailedInvestmentStatistics />
          </LayoutContent>

          <ScrollTopButton />
        </PageLayout>
      </ProtectedPage>
    </AuthPage>
  );
}
