import { AuthPage, PageLayout } from '@cc/app/components';
import { KEY_WORDS_SEO } from '@cc/shared/const';
import { CalculateYieldForm } from '@cc/widgets';
import type { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';

export default function CalculateYield() {
  return (
    <AuthPage>
      <PageLayout centerContent>
        <Head>
          <title>Calculate monthly yield | Crypto Metrics</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta
            name="description"
            content="Calculate your cryptocurrency investment returns with ease using our investment calculator. Enter your initial investment date, end date, and current date, as well as your monthly investment amount. Our smart search function allows you to easily add up to 5 coins to your portfolio, with a percentage distribution of your investment amount for each coin (e.g. 10% for BTC, 20% for ETH, etc., up to 100%)."
          />
          <meta
            name="keywords"
            content={`${KEY_WORDS_SEO}, potential yield, calculate yield, investment decisions`}
          />
          <meta name="author" content="Crypto Metrics" />
          <meta name="robots" content="index, follow" />
        </Head>

        <CalculateYieldForm />
      </PageLayout>
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
