import { NotAuthPage, PageLayout } from '@cc/app/components';
import { KEY_WORDS_SEO } from '@cc/shared/const';
import { LoginForm } from '@cc/widgets';
import { NextPage } from 'next';
import Head from 'next/head';

const Login: NextPage = () => {
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

export default Login;
