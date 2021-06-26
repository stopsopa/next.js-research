
import { useState, useEffect } from 'react';

import Link from 'next/link'

import Script from 'next/script'

/**
 * https://nextjs.org/docs/basic-features/script#lazy-loading
 */
export default function Scr({
}) {

  return (
    <div className="preview">
      <h1>Script</h1>
      <Link href="/" as="/">
        <a>Home</a>
      </Link>
      <Script
        src="/scripts/lazyLoading.js"
        strategy="lazyOnload"
      />
      <Script
        src="https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserverEntry%2CIntersectionObserver"
        // strategy="beforeInteractive"
        onLoad={() => {
          // this.setState({ stripe: window.Stripe('pk_test_12345') })
          console && console.log && console.log('polyfill loaded')
        }}
      />
      <Script />
      <Script strategy="lazyOnload">
        {`console && console.log && console.log('Inline Scripts')`}
      </Script>`
    </div>
  )
}