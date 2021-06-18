
import Link from 'next/link'

const {
  fetchJson,
} = require('../../libs/preconfiguredTransport');

const yamlhandler = require('../../yamlapi/yamlhandler');

export default function Home({
  status,
  list,
}) {

  return (
    <div>
      <h1>Server-side Rendering (SSR)</h1>
      <ul>
        {Array.isArray(list) && list.map(l => (
          <li key={l}>{l}</li>
        ))}
      </ul>

      <Link href="/">
        <a>Home</a>
      </Link>
      <br/>
      status: {status} {status === 404 && "Page not found"}
    </div>
  )
}

/**
 * https://nextjs.org/docs/basic-features/pages#scenario-1-your-page-content-depends-on-external-data
 */
// This function gets called at build time
// export async function getStaticProps({ params }) {
//
//   const ssrpageid = params.ssrpageid;
//
//   console.log(`ssr/* getStaticProps() ssrpageid: ${ssrpageid}`);
//
//   const list = await fetchJson(`/api/yaml/listofthree`);
//
//   list.push(ssrpageid);
//
//   // By returning { props: { posts } }, the Blog component
//   // will receive `posts` as a prop at build time
//   return {
//     props: {
//       list,
//     },
//   }
// }
// export async function getServerSideProps({ res }) {
//   const data = await fetch("https://api.github.com/repos/vercel/next.js");
//   const errorCode = data.ok ? false : data.statusCode;
//   if (errorCode) {
//     res.statusCode = errorCode;
//   }
//   const json = await data.json();
//
//   return {
//     props: { errorCode, stars: json.stargazers_count }
//   };
// }
export async function getServerSideProps({ params, res }) {

  const ssrpageid = params.ssrpageid;

  console.log(`ssr/* getServerSideProps() ssrpageid: ${ssrpageid}`);

  const predefined = ['ssr1', 'ssr2', 'ssr3'];

  if ( ! predefined.includes(ssrpageid) ) {

    res.statusCode = 404;

    // throw new Error(`ssrpageid '${ssrpageid}' doesn't exist on the predefined list ${predefined.join(', ')} `);

    // if not found
    return {
      notFound: true, // https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
    }
  }



  // Note: You should not use fetch() to call an API route in getStaticProps.
  // Instead, directly import the logic used inside your API route.
  // You may need to slightly refactor your code for this approach.
  //
  // Fetching from an external API is fine!
  // from: https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
  // const list = await fetchJson(`/api/yaml/listofthree`);

  const list = await yamlhandler('listofthree');

  list.push(ssrpageid);

  // Pass data to the page via props
  return {
    props: {
      status: res.statusCode,
      list
    }
  }
}

// export async function getStaticPaths() {
//
//   console.log(`ssr/* getStaticPaths() return ssr*(x3)`);
//
//   // // Call an external API endpoint to get posts
//   // const res = await fetch('https://.../posts')
//   //
//   // const posts = await res.json()
//
//   // Get the paths we want to pre-render based on posts
//   const paths = [
//     { params: { ssrpageid: 'ssr1' }, },
//     { params: { ssrpageid: 'ssr2' }, },
//     { params: { ssrpageid: 'ssr3' }, },
//   ]
//
//   // We'll pre-render only these paths at build time.
//   // { fallback: false } means other routes should 404.
//   return { paths, fallback: false }
// }
