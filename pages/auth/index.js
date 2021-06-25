
import Link from 'next/link'

const {
  fetchJson,
} = require('../../libs/preconfiguredTransport');

import log from 'inspc';

import xWwwFormUrlencoded from '../../libs/xWwwFormUrlencoded';

import jwtCookie from '../../libs/jwtCookie';

export default function Home({
  user,
}) {

  let container;

  if (user) {

    container = (
      <div>
        User:
        <pre>{JSON.stringify({
          user,
          'NEXT_PUBLIC_JWT_COOKIE_NAME': process.env.NEXT_PUBLIC_JWT_COOKIE_NAME,
        }, null, 4)}</pre>
        <br/>
        <button onClick={() => {
          document.cookie = process.env.NEXT_PUBLIC_JWT_COOKIE_NAME + '=;Path=/;Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
          location.href = location.href
        }}>logout in browser</button>
        <br/>
        <form method="post">
          <input type="hidden" name="_auth" defaultValue="logout" />
          <button type="submit">logout on server</button>
        </form>
      </div>
    )
  }
  else {

    container = (
      <form method="post">

        <label htmlFor="username">
          <b>Username</b>
        </label>
        <input type="text" placeholder="Enter Username" name="username" required
               defaultValue="username"
        />
        <br/>

        <label htmlFor="password">
          <b>Password</b>
        </label>
        <input type="password" placeholder="Enter Password" name="password" required
               defaultValue="ppp"
        />
        <br/>

        <input type="hidden" name="_auth" defaultValue="login" />

        <label>
          <input type="checkbox" name="remember" /> Remember me
        </label>
        <br/>
        <button type="submit">Login</button>

        {/*<div className="container" style="background-color:#f1f1f1">*/}
        {/*  <button type="button" className="cancelbtn">Cancel</button>*/}
        {/*  <span className="password">Forgot <a href="#">password?</a></span>*/}
        {/*</div>*/}
      </form>
    )
  }

  return (
    <div>
      <h1>Auth</h1>
      <Link href="/#ssr" as="/#ssr">
        <a>Home</a>
      </Link>
      <hr/>
      {container}
    </div>
  )
}

/**
 * https://nextjs.org/docs/basic-features/pages#server-side-rendering
 * https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering
 */
export async function getServerSideProps({ // https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering
  params,
  req,
  res,
  query,
}) {

  console.log(`===== auth: getServerSideProps()`);

  const cookie = jwtCookie(req, res);

  const form = {
    username: '',
    password: '',
    remember: false,
  };

  let user = cookie.getVerifiedPayloadStripped() || false;

  if ( user ) {

    console.log('user: from cookie');
  }

  if (xWwwFormUrlencoded.check(req)) {

    try {

      const {
        username,
        password,
        remember,
        _auth,
      } = await xWwwFormUrlencoded(req);

      if ( ! user && _auth === 'login') {

        if (
          typeof username === 'string' &&
          ! username.trim() &&
          typeof password === 'string' &&
          ! password.trim()
        ) {

          form.username = username;

          form.password = password;
        }

        const authenticated = true; // is user authenticated - bit to implement

        if (authenticated) {

          console.log('user: created', req.method);

          user = form;

          cookie.setPayload(user, remember !== undefined);

          if (req.method !== 'GET') {

            log.dump({
              "req.method !== GET": req.method !== 'GET'
            })

            return {
              redirect: {
                destination: req.url,
                statusCode: 301, // https://developer.mozilla.org/en-US/docs/Web/HTTP/Redirections#permanent_redirections
              }
            }
          }
        }
      }

      if (_auth === 'logout') {

        cookie.del();

        return {
          redirect: {
            destination: req.url,
            statusCode: 301, // https://developer.mozilla.org/en-US/docs/Web/HTTP/Redirections#permanent_redirections
          }
        }
      }

    } catch ( error ) {

      log.dump({
        auth_error: error,
      });
    }
  }

  log.dump({
    NEXT_PUBLIC_JWT_COOKIE_NAME: cookie.get(),
    payload: cookie.getVerifiedPayloadStripped(),
    form,
    user,
  });

  return {
    props: {
      form,
      user,
    },
  }
}