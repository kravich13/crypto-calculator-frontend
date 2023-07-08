import { PageLayout } from '@cc/app/components';
import { InvestmentCardsList } from '@cc/widgets';
import type { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';

export default function InvestmentCards() {
  const { t } = useTranslation();

  return (
    <PageLayout>
      <Head>
        <title>{t('cc.page.investmentCards.seo.title')}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <InvestmentCardsList />
    </PageLayout>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en')),
    },
  };
};
