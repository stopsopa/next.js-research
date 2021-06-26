
import Link from 'next/link'

/**
 * https://nextjs.org/docs/advanced-features/custom-error-page
 */
export default function Custom404() {
  return (
    <div>
      <h1>404 - Page Not Found (404.js file)</h1>

      <Link href="/" as="/">
        <a>Home</a>
      </Link>

      <hr/>
    </div>
  )
}

