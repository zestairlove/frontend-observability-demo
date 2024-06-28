// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import '../styles/globals.css';
import { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';
import Theme from '../styles/Theme';
import UserProvider from '../Providers/UserProvider';

declare global {
  interface Window {
    ENV: {
      NEXT_PUBLIC_PLATFORM?: string;
      // NEXT_PUBLIC_OTEL_SERVICE_NAME?: string;
      // NEXT_PUBLIC_OTEL_EXPORTER_OTLP_TRACES_ENDPOINT?: string;
      // IS_SYNTHETIC_REQUEST?: string;
    };
  }
}

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const { currentUser } = pageProps;
  return (
    <UserProvider userState={{ currentUser }}>
      <ThemeProvider theme={Theme}>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </ThemeProvider>
    </UserProvider>
  );
}

export default MyApp;
