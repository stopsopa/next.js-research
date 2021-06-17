import Head from 'next/head'

import Link from 'next/link'

import { useRouter } from 'next/router'

export default function Home() {

  const router = useRouter();

  const { segment } = router.query

  return (
    <div className="container">
      
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>

        <h1 className="title">
          {segment} - takes precedence
        </h1>

        <p className="description">

          <a href="https://nextjs.org/docs/routing/dynamic-routes#caveats">Predefined routes take precedence over dynamic routes</a>

          <br/>

          <Link href="/">
            <a>Home</a>
          </Link>
        </p>
         <hr/>
         router.query:
         <pre>{JSON.stringify(router.query, null, 4)}</pre>
      </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
