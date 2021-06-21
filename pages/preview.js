
import { useState, useEffect } from 'react';

import Link from 'next/link'

const {
  fetchJson,
  fetchData,
} = require('../libs/preconfiguredTransport');

function listCookiesObj() {
  return document.cookie.split(';').reduce((cookies, cookie) => {
    const [ name, value ] = cookie.split('=').map(c => c.trim());
    (name.trim() && value.trim()) && (cookies[name] = value);
    return cookies;
  }, {});
}

function listCookies() {

  try {

    return Object.entries(listCookiesObj());
  }
  catch (e) {

    return [];
  }
}

function listenCookieChange(callback, interval = 1000) {
  let lastCookie = document.cookie;
  setInterval(()=> {
    let cookie = document.cookie;
    if (cookie !== lastCookie) {
      try {
        callback({oldValue: lastCookie, newValue: cookie});
      } finally {
        lastCookie = cookie;
      }
    }
  }, interval);
}

/**
 * https://nextjs.org/docs/advanced-features/preview-mode
 */
export default function Home({
}) {

  const [ token, setToken ] = useState(false);

  const [ path, setPath ] = useState('/isr/isr2');

  const [ loadedPath, setLoadedPath ] = useState({
    i: 0,
  });

  const [ cookies, setCookies ] = useState([]);

  async function getToken() {

    const res = await fetchData(`/api/preview/gettoken`);

    const token = await res.text();

    setToken(token);
  }

  useEffect(() => {

    getToken();

    function cookiesChanged() {

      setCookies(listCookies());
    }

    cookiesChanged();

    listenCookieChange(cookiesChanged, 100);
  }, []);

  return (

    <div>
      <h1>preview</h1>
      <Link href="/#isr" as="/#isr">
        <a>Home</a>
      </Link>

      <hr/>

      <p>
        token:
        <input type="text" value={token} onChange={e => setToken(e.target.value)} style={{width:'50%'}}/>
        <button onClick={getToken}>refresh token</button>
      </p>
      <input type="text" value={path} onChange={e => setPath(e.target.value)} />
      <button onClick={() => setLoadedPath(v => ({
        i: v.i + 1,
        path: path ? path : false,
        src: (path && token) ? `/api/preview/redirect?path=${encodeURIComponent(path)}&token=${token}`: false,
      }))}>go</button>

      <br/>
      <h4>cookies:</h4>
      {cookies.length > 0 && (
        <table border="1" style={{width: '90%'}}>
          <thead>
            <tr>
              <th>name</th>
              <th>
                actions
              </th>
              <th>value</th>
            </tr>
          </thead>
          <tbody>
            {cookies.map(c => (
              <tr key={c[0]}>
                <td>{c[0]}</td>
                <td align="center">
                  <button onClick={() => {
                    document.cookie = `${c[0]}=;Path=/;Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
                  }}>D</button>
                </td>
                <td style={{wordBreak: 'break-word'}}>{c[1]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button onClick={() => fetchData('/api/preview/clearcookies')}>Clear cookies on the server</button>
      <hr/>

      {loadedPath.path && (
        <iframe
          key={loadedPath.i}
          data-key={loadedPath.i}
          src={loadedPath.src}
          style={{border: '1px solid red', width: '90%', height: '400px'}}
        />
      )}
    </div>
  )
}

/**
 * https://nextjs.org/docs/basic-features/pages#server-side-rendering
 * https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering
 */
// export async function getServerSideProps({ // https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering
//   params,
//   req,
//   res,
//   query,
// }) {
//
//   return {
//     props: {
//     },
//   }
// }