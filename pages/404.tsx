import { PageLayout } from '@cc/app/components';
import { LayoutContent, Typography } from '@cc/shared/ui';
import type { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { KEY_WORDS_SEO } from 'src/shared/consts';

export default function Custom404() {
  const { t } = useTranslation();

  return (
    <PageLayout centerContent>
      <Head>
        <title>{t('cc.page.404.seo.title')}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={t('cc.page.404.seo.description')} />
        <meta name="keywords" content={`${KEY_WORDS_SEO}, 404 error page, page not found`} />
      </Head>

      <LayoutContent isCenterPosition containerStyles={{ maxWidth: 'xs' }}>
        <Typography tint variant="h5" component="h1" fontWeight="600" textAlign="center">
          404 - {t('cc.page.404.title')}
        </Typography>
      </LayoutContent>
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
