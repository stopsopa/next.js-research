
const { useState } = require('react');

import Link from 'next/link'

import dynamic from 'next/dynamic'

const DynamicComponent = dynamic(
  () => import('../components/Dynamic'),
  {
    loading: () => <p>Loading</p>,
    ssr: false, // this will make window.test = true; to don't crush the server
  }
)

/**
 * https://nextjs.org/docs/advanced-features/dynamic-import
 */
export default function Dynamic({}) {

  const [ show, setShow ] = useState(false);

  return (
    <div className="preview">
      <h1>Dynamic imports</h1>
      <Link href="/" as="/">
        <a>Home</a>
      </Link>

      <hr/>

      <button onClick={() => setShow(true)}>go</button>

      {show && <DynamicComponent />}
      {/*<DynamicComponent />*/}

    </div>
  )
}