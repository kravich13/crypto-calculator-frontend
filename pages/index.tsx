import { PageLayout } from '@cc/app/components';
import { KEY_WORDS_SEO } from 'src/shared/consts';
import { ScrollTopButton } from '@cc/shared/ui/components';
import { MainContent } from '@cc/widgets';
import type { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';

export default function Home() {
  const { t } = useTranslation();

  return (
    <PageLayout>
      <Head>
        <title>{t('cc.page.main.seo.title')}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={t('cc.page.main.seo.description')} />
        <meta name="keywords" content={`${KEY_WORDS_SEO}`} />
        <meta name="author" content="Crypto Metrics" />
      </Head>

      <MainContent />

      <ScrollTopButton />
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
