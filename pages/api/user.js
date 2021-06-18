/**
 * https://nextjs.org/docs/api-routes/introduction
 *
 * cors: https://nextjs.org/docs/api-routes/api-middlewares#connectexpress-middleware-support
 *
 * available response methods:
 *  https://nextjs.org/docs/api-routes/response-helpers
 *
 * var r = await fetch('/api/user'); console.log(await r.json())
 */
export default function handler(req, res) {

  res
    .status(200)
    .json({ name: 'John Doe' })
  ;
}