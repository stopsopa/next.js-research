
import Link from 'next/link'

export default function Custom404() {
  return (
    <div>
      <h1>500 - Server-side error occurred</h1>

      <Link href="/" as="/">
        <a>Home</a>
      </Link>

      <hr/>
    </div>
  )
}