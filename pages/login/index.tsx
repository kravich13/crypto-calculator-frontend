import { NotAuthPage, PageLayout } from '@cc/app/components';
import { KEY_WORDS_SEO } from '@cc/shared/const';
import { LoginForm } from '@cc/widgets';
import type { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';

const Login = () => {
  return (
    <NotAuthPage>
      <PageLayout centerContent>
        <Head>
          <title>Log in | Crypto Metrics</title>
          <meta
            name="description"
            content="Log in to Crypto Metrics and start calculating your cryptocurrency holdings."
          />
          <meta name="keywords" content={`${KEY_WORDS_SEO}, log in`} />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>

        <LoginForm />
      </PageLayout>
    </NotAuthPage>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en')),
    },
  };
};

export default Login;
