import { PageLayout } from '@cc/app/components';
import { RoutesTypes } from '@cc/shared/enums';
import { useAuthPage, useRedirectCondition } from '@cc/shared/lib';
import { InvestmentCardsList } from '@cc/widgets';
import Head from 'next/head';

export default function InvestmentCards() {
  useAuthPage({ redirectTo: RoutesTypes.MAIN });
  useRedirectCondition({ redirectTo: RoutesTypes.MAIN });

  return (
    <PageLayout>
      <Head>
        <title>Calculator | Investment cards</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <InvestmentCardsList />
    </PageLayout>
  );
}