
import Link from 'next/link'

const {
  fetchJson,
} = require('../../libs/preconfiguredTransport');

const yamlhandler = eval('require')('../../yamlapi/yamlhandler');

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

      <Link href="/#ssr" as="/#ssr">
        <a>Home</a>
      </Link>
      <br/>
      status: {status} {status === 404 && "Page not found"}
    </div>
  )
}

/**
 * https://nextjs.org/docs/basic-features/pages#server-side-rendering
 */
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
  const list = await fetchJson(`/api/yaml/listofthree`);

  // const list = await yamlhandler('listofthree');

  list.push(ssrpageid);

  // Pass data to the page via props
  return {
    props: {
      status: res.statusCode,
      list
    }
  }
}