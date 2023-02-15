import { Layout } from '@cc/app/components';
import { AuthProvider, ReduxProvider } from '@cc/app/providers';
import { CssBaseline } from '@mui/material';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReduxProvider>
      <AuthProvider>
        <CssBaseline />

        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </ReduxProvider>
  );
}