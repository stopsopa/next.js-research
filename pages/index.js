
import React, { Fragment } from 'react';

import { useRouter } from 'next/router'

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

  const { push } = useRouter()

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
          <br/>
          {/*https://nextjs.org/docs/routing/imperatively*/}
          <button onClick={() => push('/blog/button-segment/predefined?push=ok')}>navigating with button (onClick)</button>
          <hr/>
          <h4 id="ssg">Static-site Generator (SSG)</h4>
          <Link
            href="/ssg/ssg1"
            as={`/ssg/ssg1`}
          >
            <a>/ssg/ssg1</a>
          </Link>
          <br/>
          <Link
            href="/ssg/ssg2"
            as={`/ssg/ssg2`}
          >
            <a>/ssg/ssg2</a>
          </Link>
          <br/>
          <Link
            href="/ssg/ssg3"
            as={`/ssg/ssg3`}
          >
            <a>/ssg/ssg3</a>
          </Link>
          <br/>
          <Link
            href="/ssg/ssg4"
            as={`/ssg/ssg4`}
          >
            <a>/ssg/ssg4 - non existing in getStaticPaths</a>
          </Link>
          <h4 id="ssr">Server-side Rendering (SSR)</h4>
          <Link
            href="/ssr/ssr1"
            as={`/ssr/ssr1`}
          >
            <a>/ssr/ssr1</a>
          </Link>
          <br/>
          <Link
            href="/ssr/ssr2"
            as={`/ssr/ssr2`}
          >
            <a>/ssr/ssr2</a>
          </Link>
          <br/>
          <Link
            href="/ssr/ssr3"
            as={`/ssr/ssr3`}
          >
            <a>/ssr/ssr3</a>
          </Link>
          <br/>
          <Link
            href="/ssr/ssr4"
            as={`/ssr/ssr4`}
          >
            <a>/ssr/ssr4 - non existing in getStaticPaths</a>
          </Link>
          <h4 id="isr">Incremental Static Regeneration (ISR)</h4>
          <Link
            href="/isr/isr1"
            as={`/isr/isr1`}
          >
            <a>/isr/isr1</a>
          </Link>
          <br/>
          <Link
            href="/isr/isr2"
            as={`/isr/isr2`}
          >
            <a>/isr/isr2</a>
          </Link>
          <br/>
          <Link
            href="/isr/isr3"
            as={`/isr/isr3`}
          >
            <a>/isr/isr3</a>
          </Link>
          <br/>
          <Link
            href="/isr/isr4"
            as={`/isr/isr4`}
          >
            <a>/isr/isr4 - non existing in getStaticPaths</a>
          </Link>
          <br/>
          <Link
            href="/isr/isr5"
            as={`/isr/isr5`}
          >
            <a>/isr/isr4 - one more</a>
          </Link>
          <h4 id="isFallback">Fallback pages</h4>
          <Link
            href="/isFallback/1"
            as="/isFallback/1"
          >
            <a>/isFallback/1</a>
          </Link>
          <br/>
          <Link
            href="/isFallback/2"
            as="/isFallback/2"
          >
            <a>/isFallback/2</a>
          </Link>
          <br/>
          <Link
            href="/isFallback/3"
            as="/isFallback/3"
          >
            <a>/isFallback/3</a>
          </Link>
          <br/>
          <Link
            href="/isFallback/4"
            as="/isFallback/4"
          >
            <a>/isFallback/4</a>
          </Link>
          <br/>
          <Link
            href="/isFallback/44"
            as="/isFallback/44"
          >
            <a>/isFallback/44</a>
          </Link>
          <hr/>
          <Link
            href="/auth"
            as="/auth?maintain=thisvalue"
          >
            <a>/auth?maintain=thisvalue</a>
          </Link>
          <hr/>
          <Link
            href="/preview"
            as="/preview"
          >
            <a>/preview</a>
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
