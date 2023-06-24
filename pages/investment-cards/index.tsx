import { PageLayout } from '@cc/app/components';
import { InvestmentCardsList } from '@cc/widgets';
import type { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';

export default function InvestmentCards() {
  return (
    <PageLayout>
      <Head>
        <title>Investment cards | Crypto Metrics</title>
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
