import { AuthPage, PageLayout, ProtectedPage } from '@cc/app/components';
import { Chart, DetailedInvestmentStatistics, GeneralInvestmentStatistics } from '@cc/features';
import { KEY_WORDS_SEO } from 'src/shared/consts';
import { RoutesTypes } from '@cc/shared/enums';
import { useAppSelector } from '@cc/shared/lib';
import { LayoutContent, ScrollTopButton } from '@cc/shared/ui';
import { Box, Divider } from '@mui/material';
import type { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';

export default function InvestmentStatistics() {
  const { t } = useTranslation();
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
            <title>{t('cc.page.investmentStatistics.seo.title')}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />

            <meta name="description" content={t('cc.page.investmentStatistics.seo.description')} />
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

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en')),
    },
  };
};
