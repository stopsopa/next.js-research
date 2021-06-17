
import React, { Fragment } from 'react';

import Head from 'next/head'

import Link from 'next/link'

// https://nextjs.org/docs/api-reference/next/link#if-the-child-is-a-function-component
const RedLink = React.forwardRef((props, ref) => {
  return (
    <a {...props} style={{color: 'red'}} ref={ref}/>
  )
});

// even despite above, just pure function component still works so wtf?
// https://nextjs.org/docs/api-reference/next/link#if-the-child-is-a-custom-component-that-wraps-an-a-tag
// const RedLink = props => (
//   <a {...props} style={{color: 'red'}}/>
// );

export default function Home() {
  return (
    <div className="container">

      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          Welcome to.... <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className="description">
          Get started by editing <code>pages/index.js</code>
          <br/>

          <Link href="/blog/else">
            <a>Else page</a>
          </Link>
        </p>

        <hr />

        <h4>Posts</h4>
        <div>
          {['first','second', 'third'].map(x => (
            <Fragment key={x}>
              <Link
                href={{
                  pathname: '/blog/post/[pid]',
                  query: {
                    pid: x,
                    par: `param-${x}`
                  }
                }}
              >
                <a>{x}</a>
              </Link>
              <br/>
            </Fragment>
          ))}
        </div>
        <h4>Segments</h4>
        <a href="https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes">doc page for segments</a>
        <div>
          {['seg1 page1','seg2 page2/chapter1', 'seg3 page3/chapter2/verse1'].map(xx => {

            var x = xx.split(' ');

            return (
              <Fragment key={xx}>
                <Link
                  href="/blog/[segment]/[[...all]]"
                  as={`/blog/${x[0]}/${x[1]}`}  // https://nextjs.org/docs/tag/v9.5.2/api-reference/next/link#dynamic-routes
                >
                  <a>{xx} : {`/blog/${x[0]}/${x[1]}`}</a>
                </Link>
                <br/>
              </Fragment>
            )
          })}
          <Link
            href="/blog/[segment]/[[...all]]"
            as={`/blog/optional-catch`}  // https://nextjs.org/docs/tag/v9.5.2/api-reference/next/link#dynamic-routes
            passHref
          >
            <RedLink>{`/blog/optional-catch`}</RedLink>
          </Link>
          <br/>
          <Link
            href="/blog/[segment]/[[...all]]"
            as={`/blog/optional-catch`}
          >
            <RedLink>{`/blog/optional-catch`} - no passHref</RedLink>
          </Link>
          <br/>
          <Link
            href="/blog/[segment]/predefined"
            as={`/blog/predefined-segment/predefined`}
          >
            <a>{`/blog/predefined-segment/predefined`}</a>
          </Link>
        </div>
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel" className="logo" />
        </a>
      </footer>

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
