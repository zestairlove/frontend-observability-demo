// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import Document, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document';
import { ServerStyleSheet } from 'styled-components';

const {
  ENV_PLATFORM,
  WEB_OTEL_SERVICE_NAME,
  PUBLIC_OTEL_EXPORTER_OTLP_TRACES_ENDPOINT,
  OTEL_COLLECTOR_HOST,
} = process.env;

console.log('ENV_PLATFORM', ENV_PLATFORM);
console.log('WEB_OTEL_SERVICE_NAME', WEB_OTEL_SERVICE_NAME);
console.log(
  'PUBLIC_OTEL_EXPORTER_OTLP_TRACES_ENDPOINT',
  PUBLIC_OTEL_EXPORTER_OTLP_TRACES_ENDPOINT
);
console.log('OTEL_COLLECTOR_HOST', OTEL_COLLECTOR_HOST);

class MyDocument extends Document<{ envString: string }> {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      // const baggage
      // const isSyntheticRequest;
      // const otlpTracesEndpoint

      const envString = `
        window.ENV = {
          NEXT_PUBLIC_PLATFORM: '${ENV_PLATFORM}'
        };`;

      return {
        ...initialProps,
        styles: [initialProps.styles, sheet.getStyleElement()],
        envString,
      };
    } catch (err) {
      throw new Error('Error in _document getInitialProps', { cause: err });
    } finally {
      sheet.seal();
    }
  }
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <script
            dangerouslySetInnerHTML={{ __html: this.props.envString }}
          ></script>
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
