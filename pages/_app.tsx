import { FramerMotions, Layout } from '@cc/app/components';
import { AuthProvider } from '@cc/app/providers';
import { createEmotionCache } from '@cc/app/utility';
import { wrapper } from '@cc/shared/lib';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';

const clientSideEmotionCache = createEmotionCache();
const theme = createTheme();

interface IAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function App({
  Component,
  emotionCache = clientSideEmotionCache,
  ...rest
}: IAppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <AuthProvider>
            <CssBaseline />

            <FramerMotions>
              <Layout>
                <Head>
                  <link rel="apple-touch-icon" sizes="180x180" href="/logo/apple-touch-icon.png" />
                  <link rel="icon" type="image/png" sizes="32x32" href="/logo/favicon-32x32.png" />
                  <link rel="icon" type="image/png" sizes="16x16" href="/logo/favicon-16x16.png" />
                  <link rel="manifest" href="/logo/site.webmanifest" />
                  <link rel="icon" href="/logo/favicon.ico" />
                </Head>

                <Component {...props} />
              </Layout>
            </FramerMotions>
          </AuthProvider>
        </ThemeProvider>
      </CacheProvider>
    </Provider>
  );
}
