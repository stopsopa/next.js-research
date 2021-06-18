
const {
  fetchJson,
} = require('../../libs/preconfiguredTransport');

export default function Home({
  list,
}) {

  return (
    <div>
      <h1>static-site generator (SSG)</h1>

      <ul>
        {Array.isArray(list) && list.map(l => (
          <li key={l}>{l}</li>
        ))}
      </ul>
    </div>
  )
}

/**
 * https://nextjs.org/docs/basic-features/pages#scenario-1-your-page-content-depends-on-external-data
 */
// This function gets called at build time
export async function getStaticProps() {

  const list = await fetchJson('/api/yaml/listofthree');

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      list,
    },
  }
}
