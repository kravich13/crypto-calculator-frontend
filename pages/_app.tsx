import { FramerMotions, Layout } from '@cc/app/components';
import { AuthProvider, ThemeProvider } from '@cc/app/providers';
import { createEmotionCache } from '@cc/app/utility';
import { wrapper } from '@cc/shared/lib';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';

const clientSideEmotionCache = createEmotionCache();

interface IAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function App({ Component, emotionCache = clientSideEmotionCache, ...rest }: IAppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <AuthProvider>
          <ThemeProvider>
            <FramerMotions>
              <CssBaseline />

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
          </ThemeProvider>
        </AuthProvider>
      </CacheProvider>
    </Provider>
  );
}

export default appWithTranslation(App);
