import { RoutesTypes, useAuthPage } from '@cc/shared';
import { CalculateYieldForm } from '@cc/widgets';
import Head from 'next/head';

export default function CalculateYield() {
  useAuthPage({ redirectTo: RoutesTypes.MAIN });

  return (
    <>
      <Head>
        <title>Calculator | Calculate monthly yield</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CalculateYieldForm />
    </>
  );
}
