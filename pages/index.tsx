import { PageLayout } from '@cc/app/components';
import { KEY_WORDS_SEO } from '@cc/shared/const';
import { ScrollTopButton } from '@cc/shared/ui/components';
import { MainContent } from '@cc/widgets';
import Head from 'next/head';

export default function Home() {
  return (
    <PageLayout>
      <Head>
        <title>Main | Crypto Metrics</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Calculate the value of your crypto holdings and keep track of your portfolio using Crypto Calculator. Get live prices for Bitcoin, Ethereum, and other popular cryptocurrencies."
        />
        <meta name="keywords" content={`${KEY_WORDS_SEO}`} />
        <meta name="author" content="Crypto Metrics" />
      </Head>

      <MainContent />

      <ScrollTopButton />
    </PageLayout>
  );
}
