import Document, { Html, Head, Main, NextScript, DocumentContext, DocumentInitialProps } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    const nextData = (this.props as any).__NEXT_DATA__;
    const locale = (nextData && nextData.locale) || 'en';

    return (
      <Html lang={locale}>
        <Head>
          <meta
            name="google-site-verification"
            content="f_-HjQPLDKaJupI65Aq-PA2mslm4wMHj2Fdt_amze-w"
          />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
            integrity="sha512-Ssc3I8eIxFyP5cebglF5JS56dKelEA42lhPdBlCO/tmAh+qEX5f2m8ZEFN3/GLacQKzKGL0BmH0P+0mSZIu9Bw=="
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
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
