
import Link from 'next/link'

const {
  fetchJson,
} = require('../../libs/preconfiguredTransport');

export default function Home({
  list,
}) {

  return (
    <div>
      <h1>Static-site Generator (SSG)</h1>
      <ul>
        {Array.isArray(list) && list.map(l => (
          <li key={l}>{l}</li>
        ))}
      </ul>

      <Link href="/#ssg" as="/#ssg">
        <a>Home</a>
      </Link>
    </div>
  )
}

/**
 * https://nextjs.org/docs/basic-features/pages#scenario-1-your-page-content-depends-on-external-data
 */
// This function gets called at build time

// runs only on the server-side. It will never be run on the client-side
//     from: https://nextjs.org/docs/basic-features/data-fetching#write-server-side-code-directly
export async function getStaticProps({
  params, // https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
}) {

  const yamlhandler = eval('require')(`${process.cwd()}/yamlapi/yamlhandler`);

  const ssgpageid = params.ssgpageid;

  console.log(`ssg/* getStaticProps() ssgpageid: ${ssgpageid}`);


  // Note: You should not use fetch() to call an API route in getStaticProps.
  // Instead, directly import the logic used inside your API route.
  // You may need to slightly refactor your code for this approach.
  //
  // Fetching from an external API is fine!
  // from: https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
  // const list = await fetchJson(`/api/yaml/listofthree`);

  const list = await yamlhandler('listofthree');

  list.push(ssgpageid);


  // if not found
  // return {
  //   notFound: true, // https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
  // }
  // Note: notFound is not needed for fallback: false mode as only paths returned from getStaticPaths will be pre-rendered.


  // return {
  //   redirect: {
  //     destination: '/',
  //     permanent: false,
  //   },
  // }
  // from: https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      list,
    },
  }
}
export async function getStaticPaths() {

  console.log(`ssg/* getStaticPaths() return ssg*(x3)`);

  // // Call an external API endpoint to get posts
  // const res = await fetch('https://.../posts')
  //
  // const posts = await res.json()

  // Get the paths we want to pre-render based on posts
  const paths = [
    { params: { ssgpageid: 'ssg1' }, },
    { params: { ssgpageid: 'ssg2' }, },
    { params: { ssgpageid: 'ssg3' }, },
  ]

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}
