import { PageLayout } from '@cc/app/components';
import { KEY_WORDS_SEO } from '@cc/shared/const';
import globalStyles from '@cc/shared/styles/Index.module.css';
import { Container, Typography } from '@mui/material';
import Head from 'next/head';

export default function Custom404() {
  const title = '404 Not Found | Crypto Metrics';
  const description =
    'Oops, it looks like the page you were looking for does not exist. Please check the URL and try again. Crypto Metrics is a powerful tool that allows you to calculate the value of cryptocurrencies in real-time.';

  return (
    <PageLayout centerContent>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={description} />
        <meta name="keywords" content={`${KEY_WORDS_SEO}, 404 error page, page not found`} />
      </Head>

      <Container maxWidth="xs" className={globalStyles.opacityContainer}>
        <Typography variant="h5" component="h1" fontWeight="600" textAlign="center">
          404 - Page Not Found
        </Typography>
      </Container>
    </PageLayout>
  );
}
