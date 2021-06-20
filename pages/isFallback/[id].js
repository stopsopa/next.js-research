
const { setTimeout } = require('timers/promises')

import { useRouter } from 'next/router'

import Link from 'next/link'

/**
 * https://nextjs.org/docs/basic-features/data-fetching#fallback-pages
 */
export default function Post({ id }) {

  const router = useRouter();

  let content;

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {

    content = (<div>Loading...</div>)
  }
  else {

    content = (
      <div>
        <h1>isFallback {id}</h1>
      </div>
    )
  }

  return (
    <div>
      {content}
      <Link href="/#isFallback" as="/#isFallback">
        <a>Home</a>
      </Link>
    </div>
  )
}

// This also gets called at build time
export async function getStaticProps({ params }) {

  const id = params.id;

  console.log(`isFallback/* getStaticProps(${id})`);

  await setTimeout(2000);

  // Pass post data to the page via props
  return {
    props: {
      id,
    },
    // Re-generate the post at most once per second
    // if a request comes in
    revalidate: 1,
  }
}

// This function gets called at build time
export async function getStaticPaths() {

  console.log(`isFallback/* getStaticPaths() return id = (1, 2)`);

  return {
    paths: [
      { params: { id: '1' } },
      { params: { id: '2' } },
    ],

    // not 'blocking' means it will show "loading" state to indicate
    // in the browser for the user that page is being rendered on the server so wait..
    fallback: true, // https://nextjs.org/docs/basic-features/data-fetching#when-is-fallback-true-useful
  }
}