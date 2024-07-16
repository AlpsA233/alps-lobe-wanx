import { ThemeProvider } from '@lobehub/ui';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import useImageStore from '@/store/image';

import './global.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={useImageStore}>
      <ThemeProvider themeMode={'auto'}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}
