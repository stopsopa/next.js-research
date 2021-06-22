
import '../styles.css'

// https://nextjs.org/docs/basic-features/built-in-css-support#import-styles-from-node_modules
import 'bootstrap/dist/css/bootstrap.css'

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}
