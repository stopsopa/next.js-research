
import Document, { Html, Head, Main, NextScript } from 'next/document'

import Script from 'next/script'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <style>{`html body.body {padding: 13px}`}</style>

          <Script>
            {`console && console.log && console.log('_document.js')`}
          </Script>
        </Head>
        <body className="body">
        document.js
        <hr/>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument