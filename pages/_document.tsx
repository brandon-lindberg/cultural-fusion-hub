import Document, { Html, Head, Main, NextScript, DocumentContext, DocumentInitialProps } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    // Use the locale from __NEXT_DATA__ (set by Next.js i18n)
    const locale = (this.props as any).__NEXT_DATA__.locale || 'en';
    return (
      <Html lang={locale}>
        <Head>
          {/* Google Search Console HTML-tag verification */}
          <meta
            name="google-site-verification"
            content="f_-HjQPLDKaJupI65Aq-PA2mslm4wMHj2Fdt_amze-w"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
