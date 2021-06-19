
const path = require('path');

/**
 * https://nextjs.org/docs/api-reference/next.config.js/runtime-configuration
 */
module.exports = {
  async redirects() { // https://nextjs.org/docs/api-reference/next.config.js/redirects
    return [
      {
        source: '/about', // http://localhost:3001/about
        destination: '/?redirectedfrom=/about',
        permanent: true,
      },
    ]
  },
  serverRuntimeConfig: { // not needed: https://nextjs.org/docs/basic-features/data-fetching#reading-files-use-processcwd
    root: __dirname,
  },
}