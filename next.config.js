
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
  // productionBrowserSourceMaps: true, // https://nextjs.org/docs/advanced-features/source-maps
  // sassOptions: { // https://nextjs.org/docs/basic-features/built-in-css-support#customizing-sass-options
  //   includePaths: [path.join(__dirname, 'styles')],
  // },

  async rewrites() {
    // return {
    //   // After checking all Next.js pages (including dynamic routes)
    //   // and static files we proxy any other requests
    //   fallback: [
    //     {
    //       source: '/redirect',
    //       destination: `/lima1.jpg`,
    //     },
    //   ],
    // }

    // For versions of Next.js < v10.1 you can use a no-op rewrite instead
    return [
      // we need to define a no-op rewrite to trigger checking
      // all pages/static files before we attempt proxying
      {
        source: '/:path*',
        destination: '/:path*',
      },
      {
        source: '/rewrite',
        destination: `/lima1.jpg`,
        // permanent: true,
      },
    ]
  },
}