import { FramerMotions, Layout } from '@cc/app/components';
import { AuthProvider, ReduxProvider } from '@cc/app/providers';
import { createEmotionCache } from '@cc/app/utility';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import type { AppProps } from 'next/app';

const clientSideEmotionCache = createEmotionCache();

interface IAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function App({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}: IAppProps) {
  return (
    <CacheProvider value={emotionCache}>
      <ReduxProvider>
        <AuthProvider>
          <CssBaseline />

          <FramerMotions>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </FramerMotions>
        </AuthProvider>
      </ReduxProvider>
    </CacheProvider>
  );
}
