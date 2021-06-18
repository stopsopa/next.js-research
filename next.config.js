
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
  serverRuntimeConfig: {
    root: __dirname,
  },
}