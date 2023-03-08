import { PageLayout } from '@cc/app/components';
import { LoginForm } from '@cc/widgets';
import { NextPage } from 'next';
import Head from 'next/head';

const Login: NextPage = () => {
  return (
    <PageLayout centerContent>
      <Head>
        <title>Calculator | Log in</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <LoginForm />
    </PageLayout>
  );
};

export default Login;
