// A simple example for testing it manually from your browser.
// If this is located at pages/api/preview.js, then
// open /api/preview from your browser.

const log = require('inspc');

const { token: decoder } = require('../../../libs/jwtCookie');

/**
 * https://nextjs.org/docs/advanced-features/preview-mode
 */
export default function handler(
  req, // https://nodejs.org/api/http.html#http_class_http_incomingmessage
  res, // https://nodejs.org/api/http.html#http_class_http_serverresponse
) {

  const {
    path,
    token,
  } = req.query || {};

  if ( ! decoder.decode(token) ) {

    return res.status(500).end(`Token invalid: ${token}`)
  }

  // HELPERS: https://nextjs.org/docs/api-routes/response-helpers

  // var cookies = new Cookies(req, res);

  // set using original method
  res.setPreviewData({
    previewData: "transported in cookie",
    time: (new Date()).toISOString(),
  });

  // extract what was set
  const before = res.getHeaderNames().reduce((acc, n) => {
    acc[n] = res.getHeader(n);
    return acc;
  }, {})['set-cookie'];

  // remove current
  res.removeHeader('set-cookie');

  // Array [
  //   <0> [String]: >__prerender_bypass=fac78....c5ec8; Path=/; HttpOnly; SameSite=Lax< len: 83
  //   <1> [String]: >__next_preview_data=eyJhbGciOiJIUzI1.....1CeOpqsL8fpZZ7wKnj1oiAcVtVnHq0; Path=/; HttpOnly; SameSite=Lax< len: 432
  // ]

  const after = before.map(
    v => v
      .replace(/ HttpOnly;/, '')
      .replace(/ Secure;/, '')
      .replace(/ SameSite=None/, ' SameSite=Lex')
  );

  log.dump({
    before,
    after,
  })

  // set again but without httponly
  res.setHeader('set-cookie', after);

  // log.dump({
  //   res: res.getHeaderNames().reduce((acc, n) => {
  //     acc[n] = res.getHeader(n);
  //     return acc;
  //   }, {})['set-cookie']
  // }, 4)

  res.redirect(303, path);
}