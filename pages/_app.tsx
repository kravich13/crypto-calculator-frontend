import { FramerMotions, Layout } from '@cc/app/components';
import { AuthProvider } from '@cc/app/providers';
import { createEmotionCache } from '@cc/app/utility';
import { wrapper } from '@cc/shared/lib';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

const clientSideEmotionCache = createEmotionCache();

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
        <AuthProvider>
          <CssBaseline />

          <FramerMotions>
            <Layout>
              <Component {...props} />
            </Layout>
          </FramerMotions>
        </AuthProvider>
      </CacheProvider>
    </Provider>
  );
}
