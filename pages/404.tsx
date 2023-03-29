import { PageLayout } from '@cc/app/components';
import { Container, Typography } from '@mui/material';
import Head from 'next/head';
import globalStyles from '@cc/shared/styles/Index.module.css';

export default function Custom404() {
  return (
    <PageLayout centerContent>
      <Head>
        <title>404 Not Found | Crypto Metrics</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Container maxWidth="xs" className={globalStyles.opacityContainer}>
        <Typography variant="h5" component="h1" fontWeight="600" textAlign="center">
          404 - Page Not Found
        </Typography>
      </Container>
    </PageLayout>
  );
}
