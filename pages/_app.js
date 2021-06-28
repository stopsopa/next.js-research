
import { useState } from 'react';

import '../styles.css'

// https://nextjs.org/docs/basic-features/built-in-css-support#import-styles-from-node_modules
import 'bootstrap/dist/css/bootstrap.css'

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {

  const [ counter, setCounter ] = useState(0);

  return(
    <div>
      _app.js <button onClick={() => setCounter(c => c+1)}>counter {counter}</button>
      <hr/>
      <Component {...pageProps} />
    </div>
  )
}

export function reportWebVitals(metric) {
  console.log('metric', metric)
}
