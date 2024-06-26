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

const { ENV_PLATFORM } = process.env;

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
