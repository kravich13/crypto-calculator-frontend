import { AuthPage, PageLayout } from '@cc/app/components';
import { KEY_WORDS_SEO } from 'src/shared/consts';
import { CalculateYieldForm } from '@cc/widgets';
import type { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';

export default function CalculateYield() {
  const { t } = useTranslation();

  return (
    <AuthPage>
      <PageLayout centerContent>
        <Head>
          <title>{t('cc.page.calculateYield.seo.title')}</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="description" content={t('cc.page.calculateYield.seo.description')} />
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
