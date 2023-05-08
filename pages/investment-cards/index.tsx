import { PageLayout } from '@cc/app/components';
import { InvestmentCardsList } from '@cc/widgets';
import Head from 'next/head';

export default function InvestmentCards() {
  return (
    <PageLayout>
      <Head>
        <title>Investment cards | Crypto Metrics</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <InvestmentCardsList />
    </PageLayout>
  );
}
