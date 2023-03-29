import { PageLayout } from '@cc/app/components';
import { RoutesTypes } from '@cc/shared/enums';
import { useNotAuthPage } from '@cc/shared/lib';
import { LoginForm } from '@cc/widgets';
import { NextPage } from 'next';
import Head from 'next/head';

const Login: NextPage = () => {
  useNotAuthPage({ redirectTo: RoutesTypes.MAIN });

  return (
    <PageLayout centerContent>
      <Head>
        <title>Log in | Crypto Metrics</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <LoginForm />
    </PageLayout>
  );
};

export default Login;
